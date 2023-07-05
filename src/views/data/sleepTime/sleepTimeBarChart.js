import { getSleepData } from '../../../service/dataService/sleepService';

const primary = '#8CBEB2';
const primary200 = '#00ABBD';
const primaryDark = '#FF9933';
const secondary = '#A1C7E0';
const secondaryLight = '#F06060';
const grey200 = '#E0E0E0';
const grey500 = '#9E9E9E';
const darkLight = '#BDBDBD';
const secondaryMain = '#026E81';

import Chart from 'react-apexcharts';
import React, { useEffect, useState } from 'react';

export function SleepTimeBarChart(props) {
  const [seriesData, setSeriesData] = useState([]);

  let isDataReady = false;

  useEffect(() => {
    getSleepData(1, props.startTime, props.endTime).then((res) => {
      if (res && res.status === 1) {
        if (res.data.sleep_detail.length === 1) {
          isDataReady = true;
        }
      }

      if (isDataReady) {
        const detailValue = res.data.sleep_detail[0].detailValue;
        setSeriesData([
          {
            x: '深睡',
            y: (detailValue.sleep_deep_duration / 60.0).toFixed(2),
            goals: [{ name: '理想时长', value: 2.5 }],
            fillColor: primary200
          },
          {
            x: '浅睡',
            y: (detailValue.sleep_light_duration / 60.0).toFixed(2),
            goals: [{ name: '理想时长', value: 4.5 }],
            fillColor: darkLight
          },
          {
            x: '眼动',
            y: (detailValue.sleep_rem_duration / 60.0).toFixed(2),
            goals: [{ name: '理想时长', value: 1 }],
            fillColor: primaryDark
          },
          {
            x: '清醒',
            y: (detailValue.sleep_awake_duration / 60.0).toFixed(2),
            goals: [{ name: '理想时长', value: 0.2 }],
            fillColor: secondaryMain
          }
        ]);
      } else {
        setSeriesData([
          { x: '深睡', y: 3, goals: [{ name: '理想时长', value: 2.5 }], fillColor: primary200 },
          { x: '浅睡', y: 4, goals: [{ name: '理想时长', value: 4.5 }], fillColor: darkLight },
          { x: '眼动', y: 0.8, goals: [{ name: '理想时长', value: 1 }], fillColor: primaryDark },
          { x: '清醒', y: 1, goals: [{ name: '理想时长', value: 0.2 }], fillColor: secondaryMain }
        ]);
      }
    });
  }, [props.startTime, props.endTime]);

  const chartData = {
    type: 'bar',
    options: {
      chart: {
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      plotOptions: { bar: { horizontal: true, borderRadius: 10, dataLabels: { position: 'bottom' } } },
      //去掉坐标轴
      xaxis: {
        labels: {
          show: false
        }
      },
      //每个柱子添加一个标签在最右边
      dataLabels: {
        enabled: true,
        textAnchor: 'start',
        formatter: function (val, opt) {
          //根据实际睡眠时长和理想睡眠时长，展示“过长”，“过短”，“正常”
          let sleepTime = val;
          let idealSleepTime = opt.w.config.series[0].data[opt.dataPointIndex].goals[0].value;
          let sleepTimeRange = sleepTime - idealSleepTime;
          let sleepTimeRangeText = '';
          if (sleepTimeRange > 10) {
            sleepTimeRangeText = '过长';
          }
          if (sleepTimeRange < 10) {
            sleepTimeRangeText = '过短';
          }
          if (sleepTimeRange === 0) {
            sleepTimeRangeText = '正常';
          }
          return sleepTimeRangeText;
        }
      }
    },
    series: [
      {
        name: '睡眠时长',
        data: seriesData
      }
    ]
  };

  return (
    <>
      <div style={{ background: '#ffffff', padding: '20px', borderRadius: '10px' }}>
        {!isDataReady && <h4 style={{ color: '#000000' }}>暂无数据，样例数据如下</h4>}
        {<Chart {...chartData} />}
      </div>
    </>
  );
}
