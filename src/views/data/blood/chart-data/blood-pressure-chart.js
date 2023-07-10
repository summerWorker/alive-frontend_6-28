const getBloodPressureChartData = (category, seriesData) => {
  const chartData = {
    type: 'line',
    options: {
      xaxis: {
        categories: category
      },
      dataLabels: {
        enabled: true
      }
    },
    color: ['#008FFB', '#00E396'],
    stroke: {
      curve: 'smooth'
    },
    markers: {
      size: 1
    },
    series: [
      {
        name: '收缩压',
        data: seriesData[0]
      },
      {
        name: '舒张压',
        data: seriesData[1]
      }
    ]
  };

  return { ...chartData };
};

export default getBloodPressureChartData;
