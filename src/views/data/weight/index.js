import { useEffect, useState } from 'react';

// material-ui
import { Card, Grid, List, ListItem, ListItemText, Typography } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';
import TotalWeightLineChart from './TotalWeightLineChart';
import WeightGoalSetCard from './WeightGoalSetCard';
import WeightConditionCard from './WeightConditionCard';
// import BmiCard from "./bmiCard";
import getBmiChart from './chart-data/bmi-chart';
import WeightLossCard from './WeightLossCard';
import SmallTipCard from './smallTipCard';
import { endpoint } from '../../../utils/endpoint';
import * as weightService from '../../../service/dataService/weightService';
import Chart from 'react-apexcharts';
import MainCard from '../../../ui-component/cards/MainCard';

const DataWeightAndHeight = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  const [goal, setGoal] = useState(50);
  const [currentWeight, setCurrentWeight] = useState(50);
  useEffect(() => {
    // get current weight & goal
    const userData = { user_id: 1 };
    const url1 = endpoint + '/api/weight/getWeightGoal';
    const callback1 = (data) => {
      if (data.status >= 0) {
        setGoal(data.data.goal);
        setCurrentWeight(data.data.currentWeight);
      } else {
        alert(data.msg);
      }
    };
    weightService.getWeightandGoal(url1, userData, callback1).then();
  }, []);

  const [weekData, setWeekData] = useState([]);
  const [monthData, setMonthData] = useState([
    51, 52, 51.2, 52.1, 51.0, 50.9, 51.1, 51, 52, 51.2, 52.1, 51.0, 50.9, 51.1, 51, 52, 51.2, 52.1, 51.0, 50.9, 51.1, 51, 52, 51.2, 52.1,
    51.0, 50.9, 51.1
  ]);

  useEffect((date) => {
    // get week data
    const today = new Date();
    const cur_year = today.getFullYear();
    const cur_month = (today.getMonth() + 1).toString().padStart(2, '0');
    const cur_day = today.getDate().toString().padStart(2, '0');
    const format_today = `${cur_year}-${cur_month}-${cur_day}`;

    let past_day = new Date().setDate(today.getDate() - 7);
    const temp_day = new Date(past_day); // 创建 Date 对象
    const year = temp_day.getFullYear(); // 获取年份
    const month = (temp_day.getMonth() + 1).toString().padStart(2, '0'); // 获取月份（注意月份从 0 开始，需要加 1）
    const day = temp_day.getDate().toString().padStart(2, '0'); // 获取日期
    const formattedDate = `${year}-${month}-${day}`;
    const data = { user_id: 1, start_date: formattedDate, end_date: format_today };
    const url_week = endpoint + '/weight';
    const callback = (data) => {
      if (data.status >= 0) {
        const items = data.data.weight[0].detailValue;
        setWeekData(items['items']);
      } else {
        alert(data.msg);
      }
    };
    weightService.getWeight(url_week, data, callback).then();
  }, []);

  useEffect(() => {
    //get month data
    const today = new Date();
    const cur_year = today.getFullYear();
    const cur_month = (today.getMonth() + 1).toString().padStart(2, '0');
    const cur_day = today.getDate().toString().padStart(2, '0');
    const format_today = `${cur_year}-${cur_month}-${cur_day}`;

    let past_day = new Date().setDate(today.getDate() - 30);
    const temp_day = new Date(past_day); // 创建 Date 对象
    const year = temp_day.getFullYear(); // 获取年份
    const month = (temp_day.getMonth() + 1).toString().padStart(2, '0'); // 获取月份（注意月份从 0 开始，需要加 1）
    const day = temp_day.getDate().toString().padStart(2, '0'); // 获取日期
    const formattedDate = `${year}-${month}-${day}`;
    const data = { user_id: 1, start_date: formattedDate, end_date: format_today };
    const url_month = endpoint + '/weight';
    const callback = (data) => {
      console.log(data);
      if (data.status >= 0) {
        const items = data.data.weight[0].detailValue;
        setMonthData(items['items']);
      } else {
        alert(data.msg);
      }
    };
    weightService.getWeight(url_month, data, callback).then();
  }, []);

  // goal
  function updateGoal(value) {
    setGoal(value);
    // console.log(goal);
  }

  console.log(weekData);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item lg={8} xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <TotalWeightLineChart
              isLoading={isLoading}
              goal={goal}
              currentW={currentWeight}
              weekWeight={weekData}
              monthWeight={monthData}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item lg={6} xs={12}>
                <MainCard border={false} content={false}>
                  <List sx={{ py: 0 }} style={{ marginTop: '5%', marginLeft: '5%' }}>
                    <ListItem alignItems="center" sx={{ py: 0 }}>
                      <ListItemText
                        sx={{
                          py: 0,
                          mt: 0.45,
                          mb: 0.45
                        }}
                        primary={<Typography variant="h4">您的BMI</Typography>}
                      ></ListItemText>
                    </ListItem>
                  </List>
                  <List sx={{ py: 0 }} style={{ marginRight: '5%' }}>
                    <Chart {...getBmiChart(17.0)} />
                  </List>
                </MainCard>
              </Grid>
              <Grid item lg={6} xs={12}>
                <WeightLossCard />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={4} xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <WeightConditionCard />
          </Grid>
          <Grid item xs={12}>
            <WeightGoalSetCard goal={goal} updateGoal={updateGoal} />
          </Grid>
          <Grid item xs={12}>
            <SmallTipCard />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DataWeightAndHeight;
