import { Card, Grid } from '@mui/material';
import Chart from 'react-apexcharts';

// project imports
// import { gridSpacing } from 'store/constant';
import chartData from './chart-data/bmi-circle-chart';

const BmiCard = () => {
  return (
    <Card>
      <Grid item>
        <Chart {...chartData} />
      </Grid>
    </Card>
  );
};

export default BmiCard;
