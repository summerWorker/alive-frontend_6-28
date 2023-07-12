import MainCard from '../../../ui-component/cards/MainCard';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { gridSpacing } from '../../../store/constant';
import React, { useState } from 'react';
import getBloodPressureChartData from './chart-data/blood-pressure-chart';
import Chart from 'react-apexcharts';
import dayjs from "dayjs";

import {DatePicker} from 'antd';

const { RangePicker } = DatePicker;

const infoFormat = 'YYYY-MM-DD';

const BloodPressureChartCard = (props) => {
  // week: true; month: false
  const [timeValue, setTimeValue] = useState(true);
  const handleChangeTime = (event, newValue) => {
    const date = [dayjs(props.startTime), dayjs(props.endTime)];
    if(newValue === true) {
      props.setStartTime(date[1].add(-6, 'd').format(infoFormat));
    }else{
      props.setMonthStartTime(date[1].add(-29, 'd').format(infoFormat));
    }
    setTimeValue(newValue);
  };

  // week / month category
  let weekCate = [],
    monthCate = [];
  let week_data = [[], []], month_data = [[], []];
  week_data[0] = Array(7).fill(null);
  week_data[1] = Array(7).fill(null);
  month_data[0] = Array(30).fill(null);
  month_data[1] = Array(30).fill(null);
  const today = new Date();
  const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  for (let i = 0; i < 7; ++i) {
    const cur_date = new Date(props.endTime);
    cur_date.setDate(cur_date.getDate() - i);
    weekCate[6 - i] = weekDays[cur_date.getDay()];
  }
  let tmp_week = props.weekData;
  for(let i = 0; i < tmp_week.length; ++i){
    const cur_date = new Date(tmp_week[i].date);
    const today = new Date(props.endTime);
    const day_of_week = 6 - (today.getTime() - cur_date.getTime())/(24*60*60*1000);
    // console.log(day_of_week);
    const cur_systolic = tmp_week[i].systolic;
    const cur_diastolic = tmp_week[i].diastolic;
    week_data[0][day_of_week] = cur_systolic;
    week_data[1][day_of_week] = cur_diastolic;
  }

  for (let i = 0; i < 30; ++i) {
    const cur_date = new Date(props.endTime);
    cur_date.setDate(cur_date.getDate() - i);
    const cur_month = (cur_date.getMonth() + 1).toString().padStart(2, '0');
    const cur_day = cur_date.getDate().toString().padStart(2, '0');
    monthCate[29 - i] = `${cur_month}-${cur_day}`;
  }
  let tmp_month = props.monthData;
  for(let i = 0; i < tmp_month.length; ++i){
    const cur_date = new Date(tmp_month[i].date);
    const today = new Date(props.endTime);
    const day_of_month = 29 - (today.getTime() - cur_date.getTime()) / (1000 * 60 * 60 * 24);
    // console.log(day_of_month);
    const cur_systolic = tmp_month[i].systolic;
    const cur_diastolic = tmp_month[i].diastolic;
    month_data[0][day_of_month] = cur_systolic;
    month_data[1][day_of_month] = cur_diastolic;
  }

  return (
    <MainCard content={false}>
      <CardContent>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Grid container alignItems="center" justifyContent="space-between">
              {/*<Grid item>*/}
              {/*  <Grid container direction="column" spacing={1}>*/}
              {/*    <Grid item>*/}
              {/*      <Typography variant="subtitle2">Avg. Systolic</Typography>*/}
              {/*    </Grid>*/}
              {/*    <Grid item>*/}
              {/*      <Typography variant="h3">mmHg</Typography>*/}
              {/*    </Grid>*/}
              {/*  </Grid>*/}
              {/*</Grid>*/}
              {/*<Grid item>*/}
              {/*  <Grid container direction="column" spacing={1}>*/}
              {/*    <Grid item>*/}
              {/*      <Typography variant="subtitle2">Avg. Diastolic</Typography>*/}
              {/*    </Grid>*/}
              {/*    <Grid item>*/}
              {/*      <Typography variant="h3">mmHg</Typography>*/}
              {/*    </Grid>*/}
              {/*  </Grid>*/}
              {/*</Grid>*/}
              <Grid item>
                <Button
                  disableElevation
                  variant={timeValue ? 'contained' : 'text'}
                  size="small"
                  sx={{ color: 'success[200]' }}
                  onClick={(e) => handleChangeTime(e, true)}
                >
                  本周
                </Button>
                <Button
                  disableElevation
                  variant={!timeValue ? 'contained' : 'text'}
                  size="small"
                  sx={{ color: 'success[200]' }}
                  onClick={(e) => handleChangeTime(e, false)}
                >
                  本月
                </Button>
                <div>
                  <RangePicker
                      bordered={false}
                      disabled={[true, false]}
                      value={[dayjs((timeValue === true) ? props.startTime : props.monthStartTime), dayjs(props.endTime)]}
                      onChange={(date) => {
                        if(timeValue === true) {
                          props.setStartTime(date[1].add(-6, 'd').format(infoFormat));
                          props.updateMonthData(timeValue);
                        }else {
                          props.setMonthStartTime(date[1].add(-29, 'd').format(infoFormat));
                          props.updateMonthData(timeValue);
                        }
                        props.setEndTime(date[1].format(infoFormat));
                      }}
                  />
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ pt: '16px !important' }}>
            {timeValue ? (
              <Chart {...getBloodPressureChartData(weekCate, week_data)} />
            ) : (
              <Chart {...getBloodPressureChartData(monthCate, month_data)} />
            )}
          </Grid>
        </Grid>
      </CardContent>
    </MainCard>
  );
};

export default BloodPressureChartCard;
