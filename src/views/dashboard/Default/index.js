import { useEffect, useState } from 'react';

// material-ui
import { Card, CardActionArea, Grid } from '@mui/material';

// project imports

import TipsCard from './TipsCard';
import { gridSpacing } from 'store/constant';
import HeartRateCard from './HeartRateCard';
import WeightCard from './WeightCard';
import SleepTimeCard from './SleepTimeCard';
import StepsCard from './StepsCard';
import BloodPressureCard from './BloodPressureCard';
import BloodSugarCard from './BloodSugarCard';
import DataInfoChart from './DataInfoChart';
import { useNavigate } from 'react-router';
import CaloriesCard from './CaloriesCard';
import { getMainRecord } from '../../../service/dataService/mainRecordService';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const [infoData, setInfoData] = useState('heartRate');
  const [weight, setWeight] = useState(60);
  const [heartRate, setHeartRate] = useState(73);
  const [steps, setSteps] = useState(12345);
  const [sleepTime, setSleepTime] = useState(7.63);
  const [systolicPressure, setSystolicPressure] = useState(122);
  const [diastolicPressure, setDiastolicPressure] = useState(84);
  const [bloodSugar, setBloodSugar] = useState(70);
  useEffect(() => {
    setLoading(false);
    getMainRecord('http://localhost:8081/main_record', { user_id: 1 }, (res) => {
      console.log(res);
      setWeight(res.data.weight);
      setHeartRate(res.data.heartRate);
      setSteps(res.data.steps);
      setSleepTime(res.data.sleepTime);
      setSystolicPressure(res.data.systolicPressure);
      setDiastolicPressure(res.data.diastolicPressure);
      setBloodSugar(res.data.bloodSugar);
    });
  }, []);
  const navigate = useNavigate();
  function handleClickHeartRate() {
    setInfoData('heartRate');
  }
  function handleClickWeight() {
    setInfoData('weight');
  }
  function handleClickSteps() {
    setInfoData('steps');
  }
  function handleClickSleepTime() {
    setInfoData('sleepTime');
  }
  function handleClickBloodPressure() {
    navigate('/data/blood');
  }
  function handleClickBloodSugar() {
    navigate('/data/blood');
  }
  function handleClickDiet() {
    navigate('/data/calories');
  }

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={8} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Card>
                  <CardActionArea onClick={handleClickHeartRate}>
                    <HeartRateCard isLoading={isLoading} heartRate={heartRate} />
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Card>
                  <CardActionArea onClick={handleClickWeight}>
                    <WeightCard isLoading={isLoading} weight={weight} />
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Card>
                  <CardActionArea onClick={handleClickSteps}>
                    <StepsCard isLoading={isLoading} steps={steps} />
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Card>
                  <CardActionArea onClick={handleClickSleepTime}>
                    <SleepTimeCard isLoading={isLoading} sleepTime={sleepTime} />
                  </CardActionArea>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item lg={12} md={6} sm={6} xs={12}>
                <CardActionArea onClick={handleClickBloodPressure}>
                  <BloodPressureCard isLoading={isLoading} systolicPressure={systolicPressure} diastolicPressure={diastolicPressure} />
                </CardActionArea>
              </Grid>
              <Grid item lg={12} md={6} sm={6} xs={12}>
                <CardActionArea onClick={handleClickBloodSugar}>
                  <BloodSugarCard isLoading={isLoading} bloodSugar={bloodSugar} />
                </CardActionArea>
              </Grid>
              <Grid item lg={12} md={6} sm={6} xs={12}>
                <CardActionArea onClick={handleClickDiet}>
                  <CaloriesCard isLoading={isLoading} />
                </CardActionArea>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={8}>
            <DataInfoChart isLoading={isLoading} infoData={infoData} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TipsCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
