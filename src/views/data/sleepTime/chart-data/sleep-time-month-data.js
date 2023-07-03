const primary = '#8CBEB2';
const primary200 = '#00ABBD';
const primaryDark = '#FF9933';
const secondary = '#A1C7E0';
const secondaryLight = '#F06060';
const grey200 = '#E0E0E0';
const grey500 = '#9E9E9E';
const darkLight = '#BDBDBD';
const secondaryMain = '#026E81';

export const getMonthChartData = () => {
  const monthChartData = {
    type: 'bar',
    height: 350,
    options: {
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + 'h';
        }
      },
      colors: [primary200],
      xaxis: {
        categories: [
          '6/1',
          '6/2',
          '6/3',
          '6/4',
          '6/5',
          '6/6',
          '6/7',
          '6/8',
          '6/9',
          '6/10',
          '6/11',
          '6/12',
          '6/13',
          '6/14',
          '6/15',
          '6/16',
          '6/17',
          '6/18',
          '6/19',
          '6/20',
          '6/21',
          '6/22',
          '6/23',
          '6/24',
          '6/25',
          '6/26',
          '6/27',
          '6/28',
          '6/29',
          '6/30'
        ]
      }
    },
    series: [
      {
        name: '睡眠时长',
        data: [
          44, 55, 41, 37, 22, 43, 21, 49, 45, 50, 56, 61, 58, 63, 60, 66, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135
        ]
      }
    ]
  };

  return { ...monthChartData };
};
