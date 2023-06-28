// ===========================|| DASHBOARD - TOTAL GROWTH BAR CHART ||=========================== //

const chartData = {
  height: 172,
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
        columnWidth: '30%'
      }
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
    fill: {
      type: 'solid'
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      show: true
    }
  },
  series: [
    {
      name: 'Deep Sleep',
      data: [1.5, 1.25, 1.5, 1.5, 1.5, 1.0, 1.5]
    },
    {
      name: 'Light Sleep',
      data: [3.5, 4.5, 4.5, 3.5, 3.5, 4.0, 4.0]
    },
    {
      name: 'Dream Time',
      data: [1.5, 1.45, 1.5, 1.5, 2.0, 1.05, 1.00]
    },
    // {
    //   name: 'Maintenance',
    //   data: [0, 0, 75, 0, 0, 115, 0]
    // }
  ]
};
export default chartData;
