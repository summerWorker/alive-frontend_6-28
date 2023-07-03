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
      name: '运动心率',
      data: [120, 125, 128, 130, 135, 140, 142, 145, 148, 150, 145, 140]
    },
    {
      name: '静止心率',
      data: [70, 72, 68, 75, 74, 76, 70, 73, 71, 69, 68, 72]
    }
  ],
  options: {
    ...chartConfig.options,
    chart: {
      type: 'bar'
    },
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
export { heartRateData };
