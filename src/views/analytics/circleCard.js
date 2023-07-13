// material-ui
import { Card, Grid } from '@mui/material';

//third-party
import Chart from 'react-apexcharts';

//project imports
import chartData, {getCircleChartData} from './chart-data/circle-chart';

const CircleCard = (props) => {
  return (
    <Card>
      <Grid item>
        <Chart {...getCircleChartData(props.calorieConsume, props.sleepTime, props.exerciseTime)} />
      </Grid>
    </Card>
  );
};

export default CircleCard;
