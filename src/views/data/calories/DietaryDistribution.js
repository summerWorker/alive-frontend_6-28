import { Statistic } from 'antd';
import Chart from 'react-apexcharts';
import { useEffect, useState } from 'react';
import getDietaryChartData from './chart-data/dietary-chart';
import { FireOutlined } from '@ant-design/icons';
import { Grid } from '@mui/material';

const DietaryDistribution = (props) => {
  const [averageCalories, setAverageCalories] = useState(2231);
  //碳水化合物，蛋白质，脂肪卡路里含量
  const [carbohydrateCalories, setCarbohydrateCalories] = useState(65);
  const [proteinCalories, setProteinCalories] = useState(15);
  const [fatCalories, setFatCalories] = useState(20);

  useEffect(() => {
    if (props.data.length > 0) {
      let totalCalories = 0;
      let totalCarbohydrateCalories = 0;
      let totalProteinCalories = 0;
      let totalFatCalories = 0;
      props.data.forEach((element) => {
        totalCalories += element.food.calorie * element.amount;
        totalCarbohydrateCalories += element.food.carbohydrate * element.amount;
        totalProteinCalories += element.food.protein * element.amount;
        totalFatCalories += element.food.fat * element.amount;
      });
      setAverageCalories(Number((totalCalories / props.data.length).toFixed(0)));
      setCarbohydrateCalories(Number(totalCarbohydrateCalories.toFixed(0)));
      setProteinCalories(Number(totalProteinCalories.toFixed(0)));
      setFatCalories(Number(totalFatCalories.toFixed(0)));
    }
  }, [props.data]);

  return (
    <>
      <div style={{ background: '#ffffff', padding: '20px', borderRadius: '10px' }}>
        <Grid container spacing={1} direction={'column'}>
          <Grid item>
            <h1>饮食分布</h1>
          </Grid>
          <Grid item>
            {(props.data === undefined || props.data.length === 0) && <h3>暂无数据，以下是样例数据</h3>}
            <Statistic
              title={props.state === 'week' ? '本周平均卡路里摄入量' : '本月平均卡路里摄入量'}
              value={averageCalories}
              suffix={<FireOutlined />}
            />
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
