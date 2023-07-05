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
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setTabIndex(props.chooseState);
  }, [props.chooseState]);

  useEffect(() => {
    if (props.startTime !== '' && props.endTime !== '') {
      getSleepData(1, props.startTime, props.endTime).then((res) => {
        if (res && res.status === 1) {
          const data = res.data.sleep_detail.map((item) =>
            Date(item.date) >= Date(props.startTime) && Date(item.date) <= Date(props.endTime) ? item : null
          );
          setChartData(data);
        }
      });
    }
  }, [props.startTime, props.endTime]);

  return (
    <>
      <div style={{ background: '#ffffff', padding: '20px', borderRadius: '10px' }}>
        {tabIndex === 0 && (
          <>
            <DatePicker
              bordered={false}
              value={dayjs(props.endTime)}
              onChange={(date) => {
                props.setStartTime(date.format(infoFormat));
                props.setEndTime(date.format(infoFormat));
              }}
            />
            {chartData.length === 0 && <h2>暂无数据，样例数据如下</h2>}
            <Chart {...getDayChartData(chartData)} />
          </>
        )}
        {tabIndex === 1 && (
          <>
            <RangePicker
              bordered={false}
              value={[dayjs(props.startTime), dayjs(props.endTime)]}
              disabled={[true, false]}
              onChange={(date) => {
                props.setStartTime(date[1].add(-7, 'd').format(infoFormat));
                props.setEndTime(date[1].format(infoFormat));
              }}
            />
            {chartData.length === 0 && <h2>暂无数据，样例数据如下</h2>}
            <Chart {...getWeekChartData(chartData, props.startTime, props.endTime)} />
          </>
        )}
        {tabIndex === 2 && (
          <>
            <RangePicker
              bordered={false}
              value={[dayjs(props.startTime), dayjs(props.endTime)]}
              disabled={[true, false]}
              onChange={(date) => {
                props.setStartTime(date[1].add(-30, 'd').format(infoFormat));
                props.setEndTime(date[1].format(infoFormat));
              }}
            />
            {chartData.length === 0 && <h2>暂无数据，样例数据如下</h2>}
            <Chart {...getMonthChartData(chartData, props.startTime, props.endTime)} />
          </>
        )}
      </div>
    </>
  );
}
