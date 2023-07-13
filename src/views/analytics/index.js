import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';
import AdviceCard from './adviceCard';
import SleepChart from './SleepChart';
import WeightCard from './weightCard';
import HeightCard from './heightCard';
// import StepCard from "./stepCard";
import HeartRateCard from './heartRateCard';
import CircleCard from './circleCard';
import StepChartCard from './stepChartCard';
import dayjs from "dayjs";
import * as stepsService from "../../service/dataService/stepsService";
import {getSleepData} from "../../service/dataService/sleepService";
import * as sleepService from "../../service/dataService/sleepService";
import * as mainRecordService from "../../service/dataService/mainRecordService";
import {endpoint} from "../../utils/endpoint";

// ==============================|| DATA ANALYTICS ||============================== //

const weekFormat = 'YYYY-MM-DD';

const Analytics = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  const [startTime, setStartTime] = useState(dayjs().subtract(6, 'day').format(weekFormat));
  const [endTime, setEndTime] = useState(dayjs().format(weekFormat));
  const [stepData, setStepData] = useState([]);
  const [sleepData, setSleepData] = useState([]);

  useEffect(() => {
    stepsService.getStepsData(1, startTime, endTime).then((data) => {
          if (data.status >= 0) {
            if (data.data.steps.length === 0) {
              setStepData([]);
            } else {
              setStepData(data.data.steps);
            }
          } else {
            alert(data.msg);
          }
        }
    )
  }, []);

  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [heartRate, setHeartRate] = useState();
  const [calorieConsume, setCalorieConsume] = useState();
  const [sleepTime, setSleepTime] = useState();
  const [exerciseTime, setExerciseTime] = useState();
  useEffect(() => {
    const url = endpoint + '/main_record';
    const data = {user_id: 1};
    function callback(data){
      if(data.status >= 0){
        setHeight(data.data.height);
        setWeight(data.data.weight);
        setHeartRate(data.data.heartRate);
        setCalorieConsume(data.data.calorieConsume);
        setSleepTime(data.data.sleepTime);
        setExerciseTime(data.data.exerciseTime);
      }else{
        alert(data.msg);
      }
    }
    mainRecordService.getMainRecord(url, data, callback).then();
  })

  useEffect(() => {
    sleepService.getSleepData(1, startTime, endTime).then((data) => {
      if(data.status >= 0){
        if(data.data.sleep_detail.length === 0){
          setSleepData([]);
        }else{
          setSleepData(data.data.sleep_detail);
        }
      }
    })
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item lg={3} xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <WeightCard isLoading={isLoading} weight={weight} />
          </Grid>
          <Grid item xs={12}>
            <HeightCard isLoading={isLoading} height={height} />
          </Grid>
          <Grid item xs={12}>
            <HeartRateCard isLoading={isLoading} heartrate={heartRate} />
          </Grid>
          <Grid item xs={12}>
            <CircleCard isLoading={isLoading} calorieConsume={calorieConsume} sleepTime={sleepTime} exerciseTime={exerciseTime} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={6} xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <SleepChart isLoading={isLoading} data={sleepData} />
          </Grid>
          <Grid item xs={12}>
            <StepChartCard isLoading={isLoading} data={stepData} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={3} xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <AdviceCard isLoading={isLoading} />
          </Grid>
        </Grid>
        <Grid container spacing={gridSpacing}></Grid>
      </Grid>
    </Grid>
  );
};

export default Analytics;
