import { Card, Grid } from '@mui/material';

import Chart from 'react-apexcharts';

import chartData from './chart-data/weight-chart';

const WeightChart = () => {
  return (
    <Card>
      <Grid container sx={{ p: 2, pb: 0, color: '#fff' }}></Grid>
      <Grid item>
        <Chart {...chartData} />
      </Grid>
    </Card>
  );
};

export default WeightChart;
