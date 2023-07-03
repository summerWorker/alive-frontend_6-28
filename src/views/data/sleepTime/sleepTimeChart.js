import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { Grid, IconButton, Tab, Tabs } from '@mui/material';
import { DatePicker, Dropdown } from 'antd';
import { FileAddFilled } from '@ant-design/icons';
import { getDayChartData } from './chart-data/sleep-time-day-data';
import { getMonthChartData } from './chart-data/sleep-time-month-data';
import { getWeekChartData } from './chart-data/sleep-time-week-data';
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';
const weekFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';

export function SleepTimeChart() {
  const [tabIndex, setTabIndex] = useState(0);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    setStartTime(dayjs().format(dateFormat));
    setEndTime(dayjs().format(dateFormat));
  }, []);

  const handleTabChange = (e, index) => {
    setTabIndex(index);
    if (index === 0) {
      setStartTime(dayjs().format(dateFormat));
      setEndTime(dayjs().format(dateFormat));
    }
    if (index === 1) {
      setStartTime(dayjs().subtract(7, 'day').format(weekFormat));
      setEndTime(dayjs().format(weekFormat));
    }
    if (index === 2) {
      setStartTime(dayjs().subtract(30, 'day').format(monthFormat));
      setEndTime(dayjs().format(monthFormat));
    }
  };

  const items = [
    {
      key: '1',
      label: '添加数据'
    }
  ];

  return (
    <>
      <div style={{ background: '#ffffff', padding: '20px', borderRadius: '10px' }}>
        <h1>睡眠时长</h1>

        <Grid container spacing={2} justifyContent={'space-between'}>
          <Grid item xm={3}></Grid>
          <Grid item xm={6}>
            <Tabs value={tabIndex} onChange={(e, index) => handleTabChange(e, index)}>
              <Tab disableRipple label={'日'} />
              <Tab disableRipple label={'周'} />
              <Tab disableRipple label={'月'} />
            </Tabs>
          </Grid>
          <Grid item xm={3}>
            <Dropdown
              menu={{
                items,
                selectable: true,
                defaultSelectedKeys: ['3']
              }}
            >
              <IconButton>
                <FileAddFilled />
              </IconButton>
            </Dropdown>
          </Grid>
        </Grid>

        {tabIndex === 0 && (
          <>
            <DatePicker bordered={false} value={dayjs(endTime)} />
            <Chart {...getDayChartData()} />
          </>
        )}
        {tabIndex === 1 && (
          <>
            <RangePicker bordered={false} value={[dayjs(startTime), dayjs(endTime)]} />
            <Chart {...getWeekChartData()} />
          </>
        )}
        {tabIndex === 2 && (
          <>
            <RangePicker bordered={false} value={[dayjs(startTime), dayjs(endTime)]} />
            <Chart {...getMonthChartData()} />
          </>
        )}
      </div>
    </>
  );
}
