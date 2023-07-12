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

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item lg={3} xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <WeightCard isLoading={isLoading} />
          </Grid>
          <Grid item xs={12}>
            <HeightCard isLoading={isLoading} />
          </Grid>
          <Grid item xs={12}>
            <HeartRateCard isLoading={isLoading} />
          </Grid>
          <Grid item xs={12}>
            <CircleCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={6} xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <SleepChart isLoading={isLoading} />
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
