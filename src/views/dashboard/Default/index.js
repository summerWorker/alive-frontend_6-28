import { useEffect, useState } from 'react';

// material-ui
import { Card, CardActionArea, Grid } from '@mui/material';

// project imports

import PopularCard from './PopularCard';
import { gridSpacing } from 'store/constant';
import HeightCard from './HeightCard';
import WeightCard from './WeightCard';
import SleepTimeCard from './SleepTimeCard';
import StepsCard from './StepsCard';
import BloodPressureCard from './BloodPressureCard';
import BloodSugarCard from './BloodSugarCard';
import HeartRateCard from './HeartRateCard';
import CholesterolCard from './CholesterolCard';
import DataInfoChart from './DataInfoChart';
import { useNavigate } from 'react-router';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const [infoData, setInfoData] = useState('height');
  useEffect(() => {
    setLoading(false);
  }, []);
  const navigate = useNavigate();
  function handleClickHeight() {
    setInfoData('height');
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
    navigate('/data/bloodPressure');
  }
  function handleClickBloodSugar() {
    navigate('/data/bloodSugar');
  }
  function handleClickHeartRate() {
    navigate('/data/heartRate');
  }
  function handleClickCholesterol() {
    navigate('/data/cholesterol');
  }

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={8} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                {/*EarningCard*/}
                <Card>
                  <CardActionArea onClick={handleClickHeight}>
                    <HeightCard isLoading={isLoading} />
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                {/*PopularCard*/}
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
                {/*TotalIncomeDarkCard*/}
              </Grid>
              <Grid item lg={12} md={6} sm={6} xs={12}>
                <CardActionArea onClick={handleClickBloodSugar}>
                  <BloodSugarCard isLoading={isLoading} />
                </CardActionArea>

                {/*TotalIncomeLightCard*/}
              </Grid>
              <Grid item lg={12} md={6} sm={6} xs={12}>
                <CardActionArea onClick={handleClickHeartRate}>
                  <HeartRateCard isLoading={isLoading} />
                </CardActionArea>
              </Grid>
              <Grid item lg={12} md={6} sm={6} xs={12}>
                <CardActionArea onClick={handleClickCholesterol}>
                  <CholesterolCard isLoading={isLoading} />
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
            <PopularCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
