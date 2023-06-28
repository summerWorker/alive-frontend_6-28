// material-ui
import { Card, Grid } from '@mui/material';

// third-party
import Chart from 'react-apexcharts';

// project imports
import chartData from './chart-data/step-chart';

// ===========================|| DASHBOARD DEFAULT - BAJAJ AREA CHART CARD ||=========================== //

const StepChart = () => {
  return (
    <Card sx={{ bgcolor: 'primary.light' }}>
      <Grid container sx={{ p: 2, pb: 0, color: '#fff' }}></Grid>
      <Grid item>
        <Chart {...chartData} />
      </Grid>
    </Card>
  );
};

export default StepChart;
