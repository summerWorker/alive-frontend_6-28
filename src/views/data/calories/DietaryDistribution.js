import { Statistic } from 'antd';
import Chart from 'react-apexcharts';
import { useEffect, useState } from 'react';
import getDietaryChartData from './chart-data/dietary-chart';
import { FireOutlined } from '@ant-design/icons';
import { Grid } from '@mui/material';

// porps.data:
// [
//     {
//         "id": {
//             "leastSignificantBits": -4427520278775292222,
//             "mostSignificantBits": -4349980626885868937
//         },
//         "user_id": 1,
//         "food": {
//             "calorie": 254.0,
//             "carbohydrate": 43.1,
//             "dietaryFiber": 6.0,
//             "fat": 3.5,
//             "id": {
//                 "leastSignificantBits": -4800622043122908483,
//                 "mostSignificantBits": 2754011386232356802
//             },
//             "name": "面包",
//             "picture": "https://img.zcool.cn/community/01e6315d6e20b0a801211f9ef9fe34.jpg@3000w_1l_2o_100sh.jpg",
//             "protein": 12.3,
//             "sodium": 449.0,
//             "userId": -1
//         },
//         "date": "2023-07-01",
//         "type": "BREAKFAST",
//         "amount": 9.0
//     }
// ]

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
      setAverageCalories(Number((totalCalories / 7).toFixed(0)));
      setCarbohydrateCalories(Number(totalCarbohydrateCalories.toFixed(0)));
      setProteinCalories(Number(totalProteinCalories.toFixed(0)));
      setFatCalories(Number(totalFatCalories.toFixed(0)));
    } else {
      console.log('props.data.length = 0');
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
