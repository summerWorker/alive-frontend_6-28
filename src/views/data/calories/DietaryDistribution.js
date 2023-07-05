import { Statistic } from 'antd';
import Chart from 'react-apexcharts';
import { useState } from 'react';
import getDietaryChartData from './chart-data/dietary-chart';
import { FireOutlined } from '@ant-design/icons';
import { Grid } from '@mui/material';

const DietaryDistribution = () => {
  const [averageCalories, setAverageCalories] = useState(2231);
  //碳水化合物，蛋白质，脂肪卡路里含量
  const [carbohydrateCalories, setCarbohydrateCalories] = useState(65);
  const [proteinCalories, setProteinCalories] = useState(15);
  const [fatCalories, setFatCalories] = useState(20);

  return (
    <>
      <div style={{ background: '#ffffff', padding: '20px', borderRadius: '10px' }}>
        <Grid container spacing={1} direction={'column'}>
          <Grid item>
            <h1>饮食分布</h1>
          </Grid>
          <Grid item>
            <Statistic title="本周平均卡路里摄入量" value={averageCalories} suffix={<FireOutlined />} />
          </Grid>
          <Grid item>
            <Chart {...getDietaryChartData(carbohydrateCalories, proteinCalories, fatCalories)} />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default DietaryDistribution;
