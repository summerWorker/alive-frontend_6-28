// material-ui
import {
  Button,
  CardContent, Dialog,
  DialogActions, DialogContent,
  DialogContentText, DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';

import Chart from 'react-apexcharts';
import getWeekChartData from './chart-data/weight-week-chart';
import getMonthChartData from './chart-data/weight-month-chart';
import {DatePicker} from 'antd';

const { RangePicker } = DatePicker;
import { Dropdown } from 'antd';
import { FileAddFilled } from '@ant-design/icons';

// project imports
import MainCard from '../../../ui-component/cards/MainCard';
import { gridSpacing } from '../../../store/constant';
import React, { useState } from 'react';
import dayjs from "dayjs";
import {DateCalendar} from "@mui/x-date-pickers";

const infoFormat = 'YYYY-MM-DD';

const TotalWeightLineChart = (props) => {
  const [timeValue, setTimeValue] = useState(0);
  const handleChangeTime = (event, newValue) => {
    const date = [dayjs(props.startTime), dayjs(props.endTime)];
    if(newValue === 0) {
      props.setStartTime(date[1].add(-6, 'd').format(infoFormat));
    }else{
      props.setMonthStartTime(date[1].add(-29, 'd').format(infoFormat));
    }
    setTimeValue(newValue);
  };

  let weekCate = [],
    monthCate = [];
  let weekData = Array(7).fill(null),
    monthData = Array(30).fill(null);
  const today = new Date();
  const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  for (let i = 0; i < 7; ++i) {
    const cur_date = new Date(props.endTime);
    cur_date.setDate(cur_date.getDate() - i);
    // console.log(cur_date);
    weekCate[6 - i] = weekDays[cur_date.getDay()];
  }
  // console.log(weekCate);
  let temp_week = props.weekWeight;
  // console.log(temp_week);
  for (let i = 0; i < temp_week.length; ++i) {
    const cur_date = new Date(temp_week[i].date);
    const today = new Date(props.endTime);
    // const day_of_week = cur_date.getDay() - today.getDay() + 6;
    const day_of_week = 6 - (today.getTime() - cur_date.getTime())/(24*60*60*1000);
    const cur_weight = temp_week[i].weight;
    weekData[day_of_week] = cur_weight;
  }
  // console.log(weekData);

  for (let i = 0; i < 30; ++i) {
    const cur_date = new Date(props.endTime);
    cur_date.setDate(cur_date.getDate() - i);
    const cur_month = (cur_date.getMonth() + 1).toString().padStart(2, '0');
    const cur_day = cur_date.getDate().toString().padStart(2, '0');
    monthCate[29 - i] = `${cur_month}-${cur_day}`;
  }
  // console.log(monthCate);

  let temp_month = props.monthWeight;
  // console.log(temp_month);
  for (let i = 0; i < temp_month.length; ++i) {
    const cur_date = new Date(temp_month[i].date);
    const today = new Date(props.endTime);
    const day_of_month = 29 - (today.getTime() - cur_date.getTime()) / (1000 * 60 * 60 * 24);
    // console.log(day_of_month);
    const cur_weight = temp_month[i].weight;
    monthData[day_of_month] = cur_weight;
  }
  // console.log(monthData);

  //add weight



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
                    <Typography variant="h3">{props.currentW}kg</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    <Typography variant="subtitle2">目标</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h3">{props.goal}kg</Typography>
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
              <Grid item>
                <RangePicker
                    bordered={false}
                    disabled={[true, false]}
                    value={[dayjs((timeValue === 0) ? props.startTime : props.monthStartTime), dayjs(props.endTime)]}
                    onChange={(date) => {
                      if(timeValue === 0) {
                        props.setStartTime(date[1].add(-6, 'd').format(infoFormat));
                        props.updateMonthData();
                      }else {
                        props.setMonthStartTime(date[1].add(-29, 'd').format(infoFormat));
                        props.updateMonthData();
                      }
                      props.setEndTime(date[1].format(infoFormat));
                    }}
                />
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
