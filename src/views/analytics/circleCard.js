// material-ui
import { Card, Grid } from '@mui/material';

//third-party
import Chart from 'react-apexcharts';

//project imports
import chartData from './chart-data/circle-chart';

const CircleCard = () => {
  return (
    <Card>
      <Grid item>
        <Chart {...chartData} />
      </Grid>
    </Card>
  );
};

export default CircleCard;
