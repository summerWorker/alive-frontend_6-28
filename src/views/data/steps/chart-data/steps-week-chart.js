export const getWeekStepsData = (chartData, startTime, endTime) => {
  let seriesData = [];
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);
  const timeDifference = endDate.getTime() - startDate.getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  let isDataReady = false;
  if (chartData && chartData.length > 0 && daysDifference === 7) {
    isDataReady = true;
  }

  if (!isDataReady) {
    seriesData = [456, 15, 120, 150, 230, 250, 156];
  } else {
    for (let i = 1; i <= 7; ++i) {
      const data = chartData.find((item) => new Date(item.date).getTime() - startDate.getTime() === i * 24 * 60 * 60 * 1000);
      if (data) {
        seriesData.push(data.step);
      } else {
        seriesData.push(0);
      }
    }
  }

  var daysOfWeek = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

  const weekChartData = {
    type: 'line',
    height: 350,
    options: {
      xaxis: {
        categories: daysOfWeek.slice(endDate.getDay()).concat(daysOfWeek.slice(0, endDate.getDay()))
      }
    },
    series: [
      {
        name: '步数',
        data: seriesData
      }
    ]
  };

  return { ...weekChartData };
};
