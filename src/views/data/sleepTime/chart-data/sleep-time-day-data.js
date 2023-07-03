const primary = '#8CBEB2';
const primary200 = '#00ABBD';
const primaryDark = '#FF9933';
const secondary = '#A1C7E0';
const secondaryLight = '#F06060';
const grey200 = '#E0E0E0';
const grey500 = '#9E9E9E';
const darkLight = '#BDBDBD';
const secondaryMain = '#026E81';

export const getDayChartData = () => {
  const dayChartData = {
    type: 'rangeBar',
    height: 350,
    options: {
      chart: {
        toolbar: {
          show: false // 隐藏工具栏
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '95%', // 调整条的高度百分比
          distributed: true // 分布式布局，使条之间几乎连在一起
          // borderRadius: 5 // 设置条的边框圆角
        }
      },
      xaxis: {
        labels: {
          style: {
            colors: [primary]
          }
        },
        type: 'datetime'
      },
      yaxis: {
        labels: {
          style: {
            colors: [primary]
          }
        }
      },
      grid: {
        borderColor: grey200,
        padding: {
          left: 0,
          right: 10 // 调整右侧内边距
        }
      },
      tooltip: {
        theme: 'light'
      },
      legend: {
        labels: {
          colors: grey500
        }
      },
      dataLabels: {
        enabled: false // 不显示数据标签
      }
    },
    series: [
      {
        name: '日睡眠时间',
        data: [
          {
            x: '深度睡眠',
            y: [new Date('2023-06-25T09:00:00').getTime(), new Date('2023-06-25T10:30:00').getTime()],
            fillColor: primary200
          },
          {
            x: '深度睡眠',
            y: [new Date('2023-06-25T10:30:00').getTime(), new Date('2023-06-25T11:00:00').getTime()],
            fillColor: primary200
          },
          {
            x: '眼动',
            y: [new Date('2023-06-25T11:00:00').getTime(), new Date('2023-06-25T11:30:00').getTime()],
            fillColor: primaryDark
          },
          {
            x: '眼动',
            y: [new Date('2023-06-25T11:30:00').getTime(), new Date('2023-06-25T12:00:00').getTime()],
            fillColor: primaryDark
          },
          {
            x: '深度睡眠',
            y: [new Date('2023-06-25T12:00:00').getTime(), new Date('2023-06-25T12:45:00').getTime()],
            fillColor: primary200
          },
          {
            x: '浅度睡眠',
            y: [new Date('2023-06-25T12:45:00').getTime(), new Date('2023-06-25T13:30:00').getTime()],
            fillColor: darkLight
          },
          {
            x: '眼动',
            y: [new Date('2023-06-25T13:30:00').getTime(), new Date('2023-06-25T14:15:00').getTime()],
            fillColor: primaryDark
          },
          {
            x: '清醒',
            y: [new Date('2023-06-25T14:15:00').getTime(), new Date('2023-06-25T14:30:00').getTime()],
            fillColor: secondaryMain
          },
          {
            x: '浅度睡眠',
            y: [new Date('2023-06-25T14:30:00').getTime(), new Date('2023-06-25T15:00:00').getTime()],
            fillColor: darkLight
          },
          {
            x: '浅度睡眠',
            y: [new Date('2023-06-25T15:00:00').getTime(), new Date('2023-06-25T15:45:00').getTime()],
            fillColor: darkLight
          },
          {
            x: '眼动',
            y: [new Date('2023-06-25T15:45:00').getTime(), new Date('2023-06-25T16:30:00').getTime()],
            fillColor: primaryDark
          }
        ]
      }
    ]
  };

  return { ...dayChartData };
};
