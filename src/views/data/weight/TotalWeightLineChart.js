// import { useState } from 'react';
// import { useSelector } from 'react-redux';

// material-ui
// import { useTheme } from '@mui/material/styles';
import { Button, CardContent, Grid, Typography } from '@mui/material';

// third-party
// import ApexCharts from 'apexcharts';
// import Chart from 'react-apexcharts';

// project imports
import MainCard from '../../../ui-component/cards/MainCard';
import { gridSpacing } from '../../../store/constant';
import { useState } from 'react';

// chart data
// import chartData from '../chart-data/weight-chart';
import WeightChart from './WeightChart';

// const status = [
//   {
//     value: 'week',
//     label: 'This Week'
//   },
//   {
//     value: 'month',
//     label: 'This Month'
//   }
// ];

const TotalWeightLineChart = () => {
  // const [value, setValue] = useState('week');
  //
  // const handleChangeTime = (event, newValue) => {
  //   setValue(newValue);
  // };
  //
  // const theme = useTheme();
  const [timeValue, setTimeValue] = useState(false);
  const handleChangeTime = (event, newValue) => {
    setTimeValue(newValue);
  };

  return (
    <MainCard content={false}>
      <CardContent>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    <Typography variant="subtitle2">Current</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h3">KG</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    <Typography variant="subtitle2">Goal</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h3">KG</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Button
                  disableElevation
                  variant={timeValue ? 'contained' : 'text'}
                  size="small"
                  sx={{ color: 'success[200]' }}
                  onClick={(e) => handleChangeTime(e, true)}
                >
                  Week
                </Button>
                <Button
                  disableElevation
                  variant={!timeValue ? 'contained' : 'text'}
                  size="small"
                  sx={{ color: 'success[200]' }}
                  onClick={(e) => handleChangeTime(e, false)}
                >
                  Month
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ pt: '16px !important' }}>
            <WeightChart />
          </Grid>
        </Grid>
      </CardContent>
    </MainCard>
  );
};

export default TotalWeightLineChart;
