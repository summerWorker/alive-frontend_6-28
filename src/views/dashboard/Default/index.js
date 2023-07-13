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

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const [infoData, setInfoData] = useState('heartRate');
  useEffect(() => {
    setLoading(false);
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
                    <HeartRateCard isLoading={isLoading} />
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Card>
                  <CardActionArea onClick={handleClickWeight}>
                    <WeightCard isLoading={isLoading} />
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Card>
                  <CardActionArea onClick={handleClickSteps}>
                    <StepsCard isLoading={isLoading} />
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Card>
                  <CardActionArea onClick={handleClickSleepTime}>
                    <SleepTimeCard isLoading={isLoading} />
                  </CardActionArea>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item lg={12} md={6} sm={6} xs={12}>
                <CardActionArea onClick={handleClickBloodPressure}>
                  <BloodPressureCard isLoading={isLoading} />
                </CardActionArea>
              </Grid>
              <Grid item lg={12} md={6} sm={6} xs={12}>
                <CardActionArea onClick={handleClickBloodSugar}>
                  <BloodSugarCard isLoading={isLoading} />
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
