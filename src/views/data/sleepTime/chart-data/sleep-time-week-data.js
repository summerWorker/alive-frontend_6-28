const primary = '#8CBEB2';
const primary200 = '#00ABBD';
const primaryDark = '#FF9933';
const secondary = '#A1C7E0';
const secondaryLight = '#F06060';
const grey200 = '#E0E0E0';
const grey500 = '#9E9E9E';
const darkLight = '#BDBDBD';
const secondaryMain = '#026E81';

export const getWeekChartData = (chartData, startTime, endTime) => {
  let seriesData = [];
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);
  const timeDifference = endDate.getTime() - startDate.getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  let isDataReady = false;
  if (chartData.length > 0 && daysDifference === 7) {
    isDataReady = true;
  }

  if (isDataReady) {
    let deepSleepData = [];
    let lightSleepData = [];
    let eyeMoveData = [];
    let awakeData = [];
    for (let i = 1; i <= 7; ++i) {
      const data = chartData.find((item) => new Date(item.date).getTime() - startDate.getTime() === i * 24 * 60 * 60 * 1000);
      if (data) {
        deepSleepData.push((data.detailValue.sleep_deep_duration / 60.0).toFixed(2));
        lightSleepData.push((data.detailValue.sleep_light_duration / 60.0).toFixed(2));
        eyeMoveData.push((data.detailValue.sleep_rem_duration / 60.0).toFixed(2));
        awakeData.push((data.detailValue.sleep_awake_duration / 60.0).toFixed(2));
      } else {
        deepSleepData.push(0);
        lightSleepData.push(0);
        eyeMoveData.push(0);
        awakeData.push(0);
      }
    }
    seriesData = [
      {
        name: '深度睡眠',
        data: deepSleepData
      },
      {
        name: '浅度睡眠',
        data: lightSleepData
      },
      {
        name: '眼动',
        data: eyeMoveData
      },
      {
        name: '清醒',
        data: awakeData
      }
    ];
  } else {
    seriesData = [
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
    ];
  }

  var daysOfWeek = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];

  const weekChartData = {
    type: 'bar',
    height: 350,
    series: seriesData,
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
        categories: daysOfWeek.slice(endDate.getDay()).concat(daysOfWeek.slice(0, endDate.getDay()))
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
