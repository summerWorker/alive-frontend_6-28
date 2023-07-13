// ===========================|| DASHBOARD - TOTAL GROWTH BAR CHART ||=========================== //
const getSleepChartData = (cate, deep_sleep, light_sleep, awk_sleep, eye_move_sleep) => {
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
        categories: cate
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
        name: '深度睡眠',
        data: deep_sleep
      },
      {
        name: '浅度睡眠',
        data: light_sleep
      },
      {
        name: '眼动',
        data: awk_sleep
      },
      {
        name: '清醒',
        data: eye_move_sleep
      }
    ]
  };
  return {...chartData};
}
export default getSleepChartData;
