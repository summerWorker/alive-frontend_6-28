import { SleepTimeRangeBarChart } from './sleepTimeRangeBarChart';
import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';
import { SleepTips } from './sleepTips';
import { SleepGoalCard } from './sleepGoalCard';
import { SleepGoalNextCard } from './sleepGoalNextCard';
import { SleepAbout } from './sleepAbout';

function DataSleepTime() {
  return (
    <div>
      <Grid container spacing={gridSpacing}>
        <Grid item lg={8} sm={12}>
          <Grid container direction={'column'} spacing={gridSpacing}>
            <Grid item>
              <SleepTimeRangeBarChart />
            </Grid>
            <Grid item>
              <Grid container spacing={gridSpacing}>
                <Grid item lg={6} sm={6}>
                  <SleepGoalCard />
                </Grid>
                <Grid item lg={6} sm={6}>
                  <SleepGoalNextCard />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item lg={4} sm={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item lg={12} sm={6}>
              <SleepTips />
            </Grid>
            <Grid item lg={12} sm={6}>
              <SleepAbout />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default DataSleepTime;
