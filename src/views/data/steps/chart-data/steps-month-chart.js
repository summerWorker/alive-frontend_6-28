export const getMonthStepsData = (chartData, startTime, endTime) => {
  let seriesData = [];
  let x = [];
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);
  const timeDifference = endDate.getTime() - startDate.getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  let isDataReady = false;
  if (chartData && chartData.length > 0 && daysDifference === 30) {
    isDataReady = true;
  }

  if (!isDataReady) {
    x = [
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
      '今天'
    ];
    seriesData = [
      {
        name: '步数',
        data: [0, 0, 0, 150, 230, 250, 156, 155, 120, 156, 841, 561, 21, 15, 0, 156, 78, 78, 78, 15, 5, 15, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    ];
  } else {
    let dataArr = [];
    for (let i = 1; i <= 30; ++i) {
      const data = chartData.find((item) => new Date(item.date).getTime() - startDate.getTime() === i * 24 * 60 * 60 * 1000);
      if (data) {
        dataArr.push(data.step);
      } else {
        dataArr.push(0);
      }

      const currentDate = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
      const formattedDate = currentDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
      x.push(formattedDate);
    }
    seriesData = [
      {
        name: '步数',
        data: dataArr
      }
    ];
  }

  const monthStepsData = {
    type: 'line',
    height: 350,
    options: {
      xaxis: {
        categories: x,
        labels: {
          show: true
          // formatter: function (value) {
          //   if (
          //     value ===
          //       new Date(startDate.getTime() + 1 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' }) ||
          //     value ===
          //       new Date(startDate.getTime() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' }) ||
          //     value ===
          //       new Date(startDate.getTime() + 9 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' }) ||
          //     value ===
          //       new Date(startDate.getTime() + 13 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
          //         month: '2-digit',
          //         day: '2-digit'
          //       }) ||
          //     value ===
          //       new Date(startDate.getTime() + 17 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
          //         month: '2-digit',
          //         day: '2-digit'
          //       }) ||
          //     value ===
          //       new Date(startDate.getTime() + 21 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
          //         month: '2-digit',
          //         day: '2-digit'
          //       }) ||
          //     value ===
          //       new Date(startDate.getTime() + 24 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
          //         month: '2-digit',
          //         day: '2-digit'
          //       }) ||
          //     value === '今天'
          //   ) {
          //     return value; // 显示原始值
          //   } else {
          //     return ''; // 隐藏其他标签
          //   }
          // }
        }
      }
    },
    series: seriesData
  };

  return { ...monthStepsData };
};
