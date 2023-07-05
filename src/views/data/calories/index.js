import DetailedCard from './detailedCard';
import { Grid } from '@mui/material';
import { Statistic } from 'antd';
import CountUp from 'react-countup';
import { detailChartData } from './chart-data/calories-chart';
import DietaryDistribution from './DietaryDistribution';
import DietaryTips from './dietaryTips';
import RecommendRecipe from './recommendRecipe';
const DataCalories = () => {
  const data1 = [2330, 2440, 2500, 2849, 3060, 2870, 1991];
  const data2 = [2100, 1005, 1800, 3322, 560, 1270, 2000];
  const data3 = data1.map((value, index) => value - data2[index]);
  const average_data3 = data3.reduce((a, b) => a + b, 0) / data3.length;

  const distribute = [65, 15, 20];
  const labels = ['碳水化合物', '蛋白质', '脂肪'];

  const formatter = (value) => <CountUp end={value} separator="," />;

  return (
    <Grid container spacing={3}>
      <Grid item lg={8}>
        <Grid container spacing={3} direction={'column'}>
          <Grid item>
            <DetailedCard intakeData={data1} consumptionData={data2} />
          </Grid>
          <Grid item>
            <RecommendRecipe />
          </Grid>
        </Grid>
      </Grid>

      <Grid item lg={4}>
        <Grid container spacing={3} direction={'column'}>
          <Grid item>
            <DietaryDistribution />
          </Grid>
          <Grid item>
            <DietaryTips />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default DataCalories;
