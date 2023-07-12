// ===========================|| CHART CONFIG ||=========================== //
const chartConfig = {
  height: 480,
  type: 'bar',
  options: {
    chart: {
      id: 'heartRate-chart',
      stacked: false,
      toolbar: {
        show: true
      },
      zoom: {
        enabled: true
      },
      type: 'bar'
    },
    tooltip: {
      theme: 'light'
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
      labels: {
        style: {
          fontSize: '14px'
        }
      },
      categories: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00']
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
    },
    yaxis: {
      labels: {
        formatter: (value) => {
          return Math.round(value).toString(); // 格式化为整数
        }
      }
    }
  }
};

// ===========================|| DASHBOARD - TOTAL GROWTH BAR CHART ||=========================== //

const heartRateData = {
  ...chartConfig,
  series: [
    {
      name: '心率',
      data: [70, 72, 68, 75, 74, 76, 70, 73, 71, 69, 68, 72]
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
    },
    yaxis: {
      ...chartConfig.options.yaxis,
      max: 150,
      labels: {
        formatter: function (value) {
          return Math.round(value);
        }
      }
    }
  }
};
export { heartRateData };
