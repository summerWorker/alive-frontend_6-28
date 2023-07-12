import MainCard from '../../../ui-component/cards/MainCard';
import { Button, CardContent, Grid, Typography } from '@mui/material';
import { gridSpacing } from '../../../store/constant';
import { useState } from 'react';
import { getBloodSugarChartData } from './chart-data/blood-sugar-chart';
import Chart from 'react-apexcharts';

import { DatePicker } from 'antd';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const infoFormat = 'YYYY-MM-DD';

const BloodSugarChartCard = (props) => {
  // week: true; month: false
  const [timeValue, setTimeValue] = useState(true);
  const handleChangeTime = (event, newValue) => {
    const date = [dayjs(props.startTime), dayjs(props.endTime)];
    if (newValue === true) {
      props.setStartTime(date[1].add(-6, 'd').format(infoFormat));
    } else {
      props.setMonthStartTime(date[1].add(-29, 'd').format(infoFormat));
    }
    setTimeValue(newValue);
  };

  let weekCate = [];
  for (let i = 0; i < 7; ++i) {
    const cur_date = new Date(props.endTime);
    cur_date.setDate(cur_date.getDate() - i);
    const cur_month = (cur_date.getMonth() + 1).toString().padStart(2, '0');
    const cur_day = cur_date.getDate().toString().padStart(2, '0');
    weekCate[6 - i] = `${cur_month}-${cur_day}`;
  }
  // console.log(weekCate);

  //week / month category
  let weekData = [],
    monthData = [];
  let tmp_week = props.weekData;
  for (let i = 0; i < tmp_week.length; ++i) {
    const date = new Date(tmp_week[i].date.time);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月份从 0 开始，需要加 1
    const day = date.getDate();

    const formattedYear = year.toString().padStart(4, '0');
    const formattedMonth = month.toString().padStart(2, '0');
    const formattedDay = day.toString().padStart(2, '0');

    const formattedDate = `${formattedYear}-${formattedMonth}-${formattedDay}`;
    const sugar = tmp_week[i].bloodSugar;
    weekData.push([formattedDate, sugar]);
  }
  let tmp_month = props.monthData;
  for (let i = 0; i < tmp_month.length; ++i) {
    const date = new Date(tmp_month[i].date.time);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月份从 0 开始，需要加 1
    const day = date.getDate();

    const formattedYear = year.toString().padStart(4, '0');
    const formattedMonth = month.toString().padStart(2, '0');
    const formattedDay = day.toString().padStart(2, '0');

    const formattedDate = `${formattedYear}-${formattedMonth}-${formattedDay}`;
    const sugar = tmp_month[i].bloodSugar;
    monthData.push([formattedDate, sugar]);
  }
  // console.log(tmp_month);

  return (
    <MainCard content={false}>
      <CardContent>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Grid container alignItems="center" justifyContent="space-between">
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
                    value={[dayjs(timeValue === true ? props.startTime : props.monthStartTime), dayjs(props.endTime)]}
                    onChange={(date) => {
                      if (timeValue === true) {
                        props.setStartTime(date[1].add(-6, 'd').format(infoFormat));
                        props.updateMonthData(timeValue);
                      } else {
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
              <Chart {...getBloodSugarChartData(weekData, props.startTime, props.endTime)} />
            ) : (
              <Chart {...getBloodSugarChartData(monthData, props.monthStartTime, props.endTime)} />
            )}
          </Grid>
        </Grid>
      </CardContent>
    </MainCard>
  );
};

export default BloodSugarChartCard;
