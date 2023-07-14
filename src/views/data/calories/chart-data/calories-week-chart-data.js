// chartData:
// [
//     {
//         "id": {
//             "leastSignificantBits": -4427520278775292222,
//             "mostSignificantBits": -4349980626885868937
//         },
//         "user_id": 1,
//         "food": {
//             "calorie": 254.0,
//             "carbohydrate": 43.1,
//             "dietaryFiber": 6.0,
//             "fat": 3.5,
//             "id": {
//                 "leastSignificantBits": -4800622043122908483,
//                 "mostSignificantBits": 2754011386232356802
//             },
//             "name": "面包",
//             "picture": "https://img.zcool.cn/community/01e6315d6e20b0a801211f9ef9fe34.jpg@3000w_1l_2o_100sh.jpg",
//             "protein": 12.3,
//             "sodium": 449.0,
//             "userId": -1
//         },
//         "date": "2023-07-01",
//         "type": "BREAKFAST",
//         "amount": 9.0
//     }
// ]
export const getWeekCaloriesChartData = (chartData, startTime, endTime) => {
  let categries = [];
  let seriesData = [];

  let isDataReady = false;
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);
  const timeDiff = endDate.getTime() - startDate.getTime();
  const dayDiff = Math.floor(timeDiff / (24 * 3600 * 1000));

  if (chartData && chartData.length > 0 && dayDiff === 7) {
    isDataReady = true;
  }

  if (!isDataReady) {
  } else {
    for (let i = 1; i <= 7; ++i) {
      const data = chartData.find((item) => new Date(item.date).getTime() - startDate.getTime() === i * 24 * 60 * 60 * 1000);
      if (data) {
        seriesData.push(data.calorie);
      } else {
        seriesData.push(0);
      }
    }
  }

  const weekCaloriesData = {
    type: 'area',
    height: 400,
    options: {
      chart: {
        id: 'calorie-detail',
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        },
        sparkline: {
          enabled: false // false:显示详细的坐标数据，true:只显示一条折线
        }
      },
      dataLabels: {
        enabled: false,
        background: {
          enabled: false,
          margin: 2
        }
      },
      stroke: {
        curve: 'smooth',
        width: 1.5
      },
      tooltip: {
        theme: 'light',
        fixed: {
          enabled: false
        },
        x: {
          show: true
        },
        y1: {
          title: '摄入量'
        },
        y2: {
          title: '消耗量'
        },
        y3: {
          title: '净摄入量'
        },
        marker: {
          show: true
        }
      },
      xaxis: {
        categories: categries
      }
    },
    series: [
      {
        name: '摄入量',
        data: intakeData
      },
      {
        name: '消耗量',
        data: consumptionData
      },
      {
        name: '净摄入量',
        data: netIntakeData
      }
    ]
  };

  return { ...weekCaloriesData };
};
