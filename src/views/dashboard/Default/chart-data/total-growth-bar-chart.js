// ===========================|| CHART CONFIG ||=========================== //

const chartConfig = {
  height: 480,
  type: 'bar',
  options: {
    chart: {
      id: 'bar-chart',
      stacked: true,
      toolbar: {
        show: true
      },
      zoom: {
        enabled: true
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%'
      }
    },
    xaxis: {
      type: 'category',
      categories: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
    },
    legend: {
      show: true,
      fontSize: '14px',
      fontFamily: `'Roboto', sans-serif`,
      position: 'bottom',
      offsetX: 20,
      labels: {
        useSeriesColors: false
      },
      markers: {
        width: 16,
        height: 16,
        radius: 5
      },
      itemMargin: {
        horizontal: 15,
        vertical: 8
      }
    },
    fill: {
      type: 'solid'
    },
    grid: {
      show: true
    }
  }
};

// ===========================|| DASHBOARD - TOTAL GROWTH BAR CHART ||=========================== //

const heartRateData = {
  ...chartConfig,
  series: [
    {
      name: '心率',
      data: [56, 60, 73, 70, 69, 75, 72, 69, 71, 65, 59, 66]
    }
  ],
  options: {
    ...chartConfig.options,
    dataLabels: {
      enabled: true, // Enable data labels
      formatter: function (value, { seriesIndex, dataPointIndex, w }) {
        return value.toFixed(0);
      }
    },
    title: {
      text: '心率(/min)',
      align: 'center',
      style: {
        fontSize: '24px',
        fontWeight: 'bold',
        fontFamily: `'Roboto', sans-serif`,
        color: '#333'
      }
    }
  }
};

const weightData = {
  ...chartConfig,
  series: [
    {
      name: '体重',
      data: [70, 71, 69, 68, 67, 69, 68, 70, 71, 72, 70, 69]
    }
  ],
  options: {
    ...chartConfig.options,
    dataLabels: {
      enabled: true, // Enable data labels
      formatter: function (value, { seriesIndex, dataPointIndex, w }) {
        return value.toFixed(1);
      }
    },
    title: {
      text: '体重(kg)',
      align: 'center',
      style: {
        fontSize: '24px',
        fontWeight: 'bold',
        fontFamily: `'Roboto', sans-serif`,
        color: '#333'
      }
    }
  }
};

const stepsData = {
  ...chartConfig,
  series: [
    {
      name: '运动步数',
      data: [8000, 9000, 7000, 6000, 7500, 8500, 7000, 8000, 9000, 10000, 8500, 8000]
    }
  ],
  options: {
    ...chartConfig.options,
    dataLabels: {
      enabled: true, // Enable data labels
      formatter: function (value, { seriesIndex, dataPointIndex, w }) {
        return value.toFixed(0);
      }
    },
    title: {
      text: '运动步数',
      align: 'center',
      style: {
        fontSize: '24px',
        fontWeight: 'bold',
        fontFamily: `'Roboto', sans-serif`,
        color: '#333'
      }
    }
  }
};

const sleepTimeData = {
  ...chartConfig,
  series: [
    {
      name: '睡眠时间',
      data: [7, 7.5, 8, 7.5, 8, 7.5, 7.5, 8, 8.5, 7, 7.5, 8]
    }
  ],
  options: {
    ...chartConfig.options,
    dataLabels: {
      enabled: true, // Enable data labels
      formatter: function (value, { seriesIndex, dataPointIndex, w }) {
        return value.toFixed(2);
      }
    },
    title: {
      text: '睡眠时间(h)',
      align: 'center',
      style: {
        fontSize: '24px',
        fontWeight: 'bold',
        fontFamily: `'Roboto', sans-serif`,
        color: '#333'
      }
    }
  }
};

export { heartRateData, weightData, stepsData, sleepTimeData };
