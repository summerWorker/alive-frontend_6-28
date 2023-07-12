// material-ui
import { Button, CardContent, Grid, Typography } from '@mui/material';

import Chart from 'react-apexcharts';
import getWeekChartData from './chart-data/weight-week-chart';
import getMonthChartData from './chart-data/weight-month-chart';
import getYearChartData from './chart-data/weight-year-chart';

// project imports
import MainCard from '../../../ui-component/cards/MainCard';
import { gridSpacing } from '../../../store/constant';
import { useState } from 'react';

const TotalWeightLineChart = (props) => {
  console.log(props);
  // week month year data
  // week: 0, month: 1, year: 2
  const [timeValue, setTimeValue] = useState(1);
  const handleChangeTime = (event, newValue) => {
    setTimeValue(newValue);
  };

  let weekCate = [],
    monthCate = [];
  let weekData = Array(7).fill(null),
    monthData = Array(30).fill(null);
  const today = new Date();
  const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  for (let i = 0; i < 7; ++i) {
    weekCate[6 - i] = weekDays[(today.getDay() - i + 7) % 7];
  }
  let temp_week = props.weekWeight;
  for (let i = 0; i < temp_week.length; ++i) {
    const cur_date = new Date(temp_week[i].date);
    const day_of_week = cur_date.getDay() - today.getDay() + 6;
    const cur_weight = temp_week[i].value;
    weekData[day_of_week] = cur_weight;
  }

  for (let i = 0; i < 30; ++i) {
    const cur_month = (today.getMonth() + 1).toString().padStart(2, '0');
    const cur_day = today.getDate().toString().padStart(2, '0');
    monthCate[29 - i] = `${cur_month}-${cur_day}`;
  }
  console.log(monthCate);
  let temp_month = props.monthWeight;
  for (let i = 0; i < temp_month.length; ++i) {
    const cur_date = new Date(temp_month[i].date);
    const day_of_month = cur_date.getDate() - today.getDate() + 29;
    const cur_weight = temp_month[i].value;
    monthData[day_of_month] = cur_weight;
  }

  return (
    <MainCard content={false}>
      <CardContent>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    <Typography variant="subtitle2">当前</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h3">kg</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    <Typography variant="subtitle2">目标</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h3">kg</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Button
                  disableElevation
                  variant={timeValue === 0 ? 'contained' : 'text'}
                  size="small"
                  sx={{ color: 'success[200]' }}
                  onClick={(e) => handleChangeTime(e, 0)}
                >
                  本周
                </Button>
                <Button
                  disableElevation
                  variant={timeValue === 1 ? 'contained' : 'text'}
                  size="small"
                  sx={{ color: 'success[200]' }}
                  onClick={(e) => handleChangeTime(e, 1)}
                >
                  本月
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ pt: '16px !important' }} style={{ marginRight: '2.5%' }}>
            {timeValue === 0 ? (
              <Chart {...getWeekChartData(weekData, props.goal, weekCate)} />
            ) : (
              <Chart {...getMonthChartData(monthData, props.goal, monthCate)} />
            )}
          </Grid>
        </Grid>
      </CardContent>
    </MainCard>
  );
};

export default TotalWeightLineChart;
