import { useEffect, useState } from 'react';
import HeartRateChart from './heartRateChart';
import { Grid, Typography } from '@mui/material';
import MainCard from '../../../ui-component/cards/MainCard';
import RestingHeartRateCard from './restingHeartRateCard';
import ExerciseHeartRateCard from './exerciseHeartRateCard';
import InputAdornment from '@mui/material/InputAdornment';
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
          <Grid item>
            <MainCard>
              <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>今日心率</Typography>
              <Grid container spacing={3}>
                <Grid item lg={6} md={12} xs={12}>
                  <RestingHeartRateCard isLoading={isLoading} />
                </Grid>
                <Grid item lg={6} md={12} xs={12}>
                  <ExerciseHeartRateCard isLoading={isLoading} />
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={4} md={12} xs={12}>
        <Grid container direction={'column'} spacing={3}>
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
