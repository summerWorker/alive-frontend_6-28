// dietData:
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

// workOutData:
// [
//   {
//     "id": {
//       "leastSignificantBits": -5421778987736058291,
//       "mostSignificantBits": -762420444441722757
//     },
//     "user_id": 1,
//     "exercise": {
//       "calorie": 94.0,
//       "id": {
//         "leastSignificantBits": -6176771810533443263,
//         "mostSignificantBits": 5569943781853904988
//       },
//       "name": "游泳",
//       "picture": "",
//       "userId": -1
//     },
//     "date": "2020-01-01",
//     "amount": 10.0
//   }
// ]

export const getWeekCaloriesChartData = (dietData, workOutData, startTime, endTime) => {
  let categries = [];
  let intakeData = [];
  let consumptionData = [];
  let netIntakeData = [];
  var daysOfWeek = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

  let isDataReady = false;
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);
  const timeDiff = endDate.getTime() - startDate.getTime();
  const dayDiff = Math.floor(timeDiff / (24 * 3600 * 1000));

  if (((dietData && dietData.length > 0) || (workOutData && workOutData.length > 0)) && dayDiff === 7) {
    isDataReady = true;
  }

  if (!isDataReady) {
    categries = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    intakeData = [2330, 2440, 2500, 2849, 3060, 2870, 1991];
    consumptionData = [2100, 1005, 1800, 3322, 560, 1270, 2000];
    netIntakeData = intakeData.map((value, index) => value - consumptionData[index]);
  } else {
    for (let i = 1; i <= 7; ++i) {
      let data1 = dietData.filter((item) => {
        const itemDate = new Date(item.date).getTime();
        const targetDate = startDate.getTime() + i * 24 * 60 * 60 * 1000;
        return itemDate === targetDate;
      });
      let data2 = workOutData.filter((item) => {
        const itemDate = new Date(item.date).getTime();
        const targetDate = startDate.getTime() + i * 24 * 60 * 60 * 1000;
        return itemDate === targetDate;
      });
      let allData1 = 0;
      let allData2 = 0;
      if (data1) {
        if (data1 instanceof Array) {
          allData1 += data1.map((item) => item.food.calorie * item.amount).reduce((a, b) => a + b, 0);
        } else {
          allData1 += data1.food.calorie * data1.amount;
        }
      }
      if (data2) {
        if (data2 instanceof Array) {
          allData2 += data2.map((item) => item.exercise.calorie * item.amount).reduce((a, b) => a + b, 0);
        } else {
          allData2 += data2.exercise.calorie * data2.amount;
        }
      }
      intakeData.push(allData1);
      consumptionData.push(allData2);
      netIntakeData.push(allData1 - allData2);
    }
    // console.log('intakeData', intakeData);
    // console.log('consumptionData', consumptionData);
    // console.log('netIntakeData', netIntakeData);
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
        categories: isDataReady ? daysOfWeek.slice(endDate.getDay()).concat(daysOfWeek.slice(0, endDate.getDay())) : categries
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
