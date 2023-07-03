const primary = '#8CBEB2';
const primary200 = '#00ABBD';
const primaryDark = '#FF9933';
const secondary = '#A1C7E0';
const secondaryLight = '#F06060';
const grey200 = '#E0E0E0';
const grey500 = '#9E9E9E';
const darkLight = '#BDBDBD';
const secondaryMain = '#026E81';

export const getWeekChartData = () => {
  const weekChartData = {
    type: 'bar',
    height: 350,
    series: [
      {
        name: '深度睡眠',
        data: [44, 55, 41, 37, 22, 43, 21]
      },
      {
        name: '浅度睡眠',
        data: [53, 32, 33, 52, 13, 43, 32]
      },
      {
        name: '眼动',
        data: [12, 17, 11, 9, 15, 11, 20]
      },
      {
        name: '清醒',
        data: [9, 7, 5, 8, 6, 9, 4]
      }
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        stackType: '100%'
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },

      xaxis: {
        categories: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + 'h';
          }
        }
      },
      fill: {
        opacity: 1
      },
      colors: [primary200, darkLight, primaryDark, secondaryMain]
    }
  };

  return { ...weekChartData };
};
