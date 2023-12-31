export const getDayStepsData = (data) => {
  // console.log('data', data);

  let isReady = false;
  if (data && data.length === 1) {
    isReady = true;
  }

  let steps, stepsGoal, distance, calorie;

  if (!isReady) {
    steps = 3235;
    stepsGoal = 5000;
    distance = 2.5;
    calorie = 100;
  } else {
    steps = data[0].step;
    stepsGoal = data[0].goal;
    distance = data[0].distance;
    calorie = data[0].calories;
  }

  if (stepsGoal === 0 || stepsGoal === null || stepsGoal === undefined || stepsGoal === '' || stepsGoal < 0) {
    stepsGoal = 1;
  }

  let stepsData = (steps * 100.0) / stepsGoal.toFixed(0);
  if (stepsData > 100) {
    stepsData = 100;
  }
  let distanceData = distance === 0 ? 0 : (distance * 100.0) / (stepsGoal / 1000).toFixed(0);
  if (distanceData > 100) {
    distanceData = 100;
  }
  let calorieData = calorie === 0 ? 0 : (calorie * 100.0) / ((stepsGoal / 1000) * 35).toFixed(0);
  if (calorieData > 100) {
    calorieData = 100;
  }

  let seriesData = [stepsData, distanceData, calorieData];
  // if (seriesData > 100) {
  //   seriesData = 100;
  // }
  // console.log('stepsGoal', stepsGoal, 'steps', steps, 'distance', distance, 'calorie', calorie);
  // console.log('seriesData', seriesData);

  const dayChartData = {
    type: 'radialBar',
    height: 500,
    options: {
      chart: {
        type: 'radialBar',
        offsetY: -20,
        sparkline: {
          enabled: true
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          hollow: {
            margin: 15,
            size: '40%'
          },
          track: {
            background: '#e7e7e7',
            strokeWidth: '97%',
            margin: 5, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              color: '#999',
              opacity: 1,
              blur: 2
            }
          }
        }
      },
      grid: {
        padding: {
          top: -10
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          shadeIntensity: 0.4,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 53, 91]
        },
        colors: ['#7892b5', '#00CCC0', '#FF4858']
      },
      legend: {
        show: true,
        position: 'right'
      },
      labels: [steps + '步', '距离' + distance + '公里', '消耗' + calorie + '卡路里'],
      colors: ['#7892b5', '#00CCC0', '#FF4858']
    },
    series: seriesData
  };

  return { ...dayChartData };
};
