// material-ui
import { Card, Grid } from '@mui/material';

// third-party
import Chart from 'react-apexcharts';

// project imports
import chartData from './chart-data/sleep-chart';
import getSleepChartData from "./chart-data/sleep-chart";

// ===========================|| DASHBOARD DEFAULT - BAJAJ AREA CHART CARD ||=========================== //

const SleepChartCard = () => {
    let cate = [];
    const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    for(let i = 0; i < 7; ++i){
        const cur = new Date();
        cur.setDate(cur.getDate() - i);
        cate[6 - i] = weekDays[cur.getDay()];
    }
    let data = [];

  return (
    <Card sx={{ bgcolor: 'primary.light' }}>
      <Grid container sx={{ p: 2, pb: 0, color: '#fff' }}></Grid>
      <Grid item>
        <Chart {...getSleepChartData(cate, data)} />
      </Grid>
    </Card>
  );
};

export default SleepChartCard;
