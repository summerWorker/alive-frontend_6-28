import { useEffect, useState } from 'react';
import HeartRateChart from './heartRateChart';
import { Grid, Typography } from '@mui/material';
import MainCard from '../../../ui-component/cards/MainCard';
import RestingHeartRateCard from './restingHeartRateCard';
import ExerciseHeartRateCard from './exerciseHeartRateCard';
import HeartRateGoalCard from './heartRateGoalCard';
import InputCard from './inputCard';

const DataHeartRate = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <Grid container spacing={3}>
      <Grid item lg={8} md={12} xs={12}>
        <Grid container direction={'column'} spacing={3}>
          <Grid item>
            <HeartRateChart isLoading={isLoading} />
          </Grid>
          <Grid item></Grid>
        </Grid>
      </Grid>
      <Grid item lg={4} md={12} xs={12}>
        <Grid container direction={'column'} spacing={3}>
          <Grid item lg={6} md={12} xs={12}>
            <MainCard>
              <RestingHeartRateCard isLoading={isLoading} />
            </MainCard>
          </Grid>
          <Grid item>
            <HeartRateGoalCard />
          </Grid>
          <Grid item>
            <InputCard />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DataHeartRate;
