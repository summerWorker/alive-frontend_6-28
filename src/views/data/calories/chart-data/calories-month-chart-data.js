export const getMonthCaloriesData = (dietData, workOutData, startTime, endTime) => {
  let intakeData = [];
  let consumptionData = [];
  let netIntakeData = [];
  let x = [];
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);
  const timeDifference = endDate.getTime() - startDate.getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  let isDataReady = false;

  if (
    ((dietData && dietData.length > 0) || (workOutData && workOutData.length > 0)) &&
    (daysDifference === 30 || daysDifference === 31 || daysDifference === 29 || daysDifference === 28)
  ) {
    isDataReady = true;
  }

  if (!isDataReady) {
    console.log('isDataReady', isDataReady);
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
    intakeData = [
      2335, 1562, 4587, 4568, 1257, 1578, 2335, 1562, 4587, 4568, 1257, 1578, 2335, 1562, 4587, 4568, 1257, 1578, 2335, 1562, 4587, 4568,
      1257, 1578, 2335, 1562, 4587, 4568, 1257, 1578
    ];
    consumptionData = [
      1587, 4684, 4578, 4589, 774, 4878, 4587, 1548, 1548, 1587, 1547, 1587, 4684, 4578, 4589, 774, 4878, 4587, 1548, 1548, 1587, 1547,
      1587, 4684, 4578, 4589, 774, 4878, 4587, 1548
    ];
    netIntakeData = intakeData.map((item, index) => item - consumptionData[index]);
  } else {
    console.log('isDataReady', isDataReady);
    for (let i = 1; i <= daysDifference; ++i) {
      let data1 = dietData.filter((item) => {
        const itemDate = new Date(item.date).getTime();
        const targetDate = startDate.getTime() + i * 24 * 60 * 60 * 1000;
        return itemDate === targetDate;
      });
      let data2 = workOutData.find((item) => {
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

      const currentDate = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
      const formattedDate = currentDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
      x.push(formattedDate);
    }
  }

  const monthCaloriesData = {
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
        categories: x
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

  return { ...monthCaloriesData };
};
