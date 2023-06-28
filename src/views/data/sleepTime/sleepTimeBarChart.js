import Chart from 'react-apexcharts';
import React from 'react';
import { useTheme } from '@mui/material/styles';

export function SleepTimeBarChart() {
  const theme = useTheme();

  const { primary } = theme.palette.text;
  const darkLight = theme.palette.dark.light;
  const grey200 = theme.palette.grey[200];
  const grey500 = theme.palette.grey[500];

  const primary200 = theme.palette.primary[200];
  const primaryDark = theme.palette.primary.dark;
  const secondaryMain = theme.palette.secondary.main;
  const secondaryLight = theme.palette.secondary.light;

  const chartOptions = {
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
  };

  const chartData = [
    {
      name: '睡眠时长',
      data: [
        { x: '深睡', y: 50, goals: [{ name: '理想时长', value: 10 }], fillColor: primary200 },
        { x: '浅睡', y: 20, goals: [{ name: '理想时长', value: 20 }], fillColor: darkLight },
        { x: '眼动', y: 40, goals: [{ name: '理想时长', value: 15 }], fillColor: primaryDark },
        { x: '清醒', y: 50, goals: [{ name: '理想时长', value: 16 }], fillColor: secondaryMain }
      ]
    }
  ];

  return (
    <>
      <div style={{ background: '#ffffff', padding: '20px', borderRadius: '10px' }}>
        {<Chart options={chartOptions} type={'bar'} series={chartData} />}
      </div>
    </>
  );
}
