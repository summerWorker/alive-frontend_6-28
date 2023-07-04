import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { DatePicker, Dropdown } from 'antd';
import { getDayChartData } from './chart-data/sleep-time-day-data';
import { getMonthChartData } from './chart-data/sleep-time-month-data';
import { getWeekChartData } from './chart-data/sleep-time-week-data';
import dayjs from 'dayjs';
import { getSleepData } from '../../../service/dataService/sleepService';
const { RangePicker } = DatePicker;

const dateFormat = 'MM-DD';
const weekFormat = 'MM-DD';
const monthFormat = 'YYYY-MM-DD';
const infoFormat = 'YYYY-MM-DD';

export function SleepTimeChart(props) {
  const [tabIndex, setTabIndex] = useState(0);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    setTabIndex(props.chooseState);
  }, [props.chooseState]);

  useEffect(() => {
    setStartTime(props.startTime);
    setEndTime(props.endTime);
  }, [props.startTime, props.endTime]);

  useEffect(() => {
    console.log(startTime, endTime);
    getSleepData(1, startTime, endTime).then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <>
      <div style={{ background: '#ffffff', padding: '20px', borderRadius: '10px' }}>
        {tabIndex === 0 && (
          <>
            <DatePicker
              bordered={false}
              value={dayjs(props.endTime)}
              onChange={(date) => {
                props.setEndTime(date.format(dateFormat));
              }}
              format={dateFormat}
            />
            <Chart {...getDayChartData()} />
          </>
        )}
        {tabIndex === 1 && (
          <>
            <RangePicker
              bordered={false}
              value={[dayjs(props.startTime), dayjs(props.endTime)]}
              disabled={[true, false]}
              onChange={(date) => {
                props.setStartTime(date[1].add(-7, 'd').format(weekFormat));
                props.setEndTime(date[1].format(weekFormat));
              }}
              format={weekFormat}
            />
            <Chart {...getWeekChartData()} />
          </>
        )}
        {tabIndex === 2 && (
          <>
            <RangePicker
              bordered={false}
              value={[dayjs(props.startTime), dayjs(props.endTime)]}
              disabled={[true, false]}
              onChange={(date) => {
                props.setStartTime(date[1].add(-30, 'd').format(weekFormat));
                props.setEndTime(date[1].format(weekFormat));
              }}
              format={monthFormat}
            />
            <Chart {...getMonthChartData()} />
          </>
        )}
      </div>
    </>
  );
}
