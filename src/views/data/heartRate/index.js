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
    <Grid container>
      <Grid item xs={8}>
        <Grid container direction={'column'}>
          <Grid item>
            <HeartRateChart isLoading={isLoading} />
          </Grid>
          <Grid item>
            <MainCard>
              <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>今日心率</Typography>
              <Grid container>
                <Grid item xs={6}>
                  <RestingHeartRateCard isLoading={isLoading} />
                </Grid>
                <Grid item xs={6}>
                  <ExerciseHeartRateCard isLoading={isLoading} />
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <HeartRateGoalCard />
        <InputCard />
      </Grid>
    </Grid>
  );
};

export default DataHeartRate;
