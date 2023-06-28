const chartData = {
  type: 'line',
  height: 170,
  options: {
    chart: {
      zoom: {
        enabled: false
      }
    },
    markers: {
      size: 6,
      strokeWidth: 0,
      hover: {
        size: 9
      }
    },
    grid: {
      show: true,
      padding: {
        bottom: 0
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#69F0AE'],
    fill: {
      type: 'solid',
      opacity: 1
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    xaxis: {
      type: 'category',
      categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat']
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
    // yaxis: {
    //   min: 0,
    //   max: 100
    // },
    tooltip: {
      theme: 'dark',
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      y: {
        title: 'Steps'
      },
      marker: {
        show: true
      }
    }
  },
  series: [
    {
      name: 'steps',
      data: [45, 66, 41, 89, 25, 44, 9]
    }
  ]
};

export default chartData;
