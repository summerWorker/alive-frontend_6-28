const chartData = {
  height: 310,
  type: 'radialBar',
  series: [76, 67, 61],
  options: {
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            show: false
          }
        }
      }
    ],
    stroke: {
      lineCap: 'round'
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: '30%',
          background: 'transparent'
        },
        dataLabels: {
          name: {
            show: true
          },
          value: {
            show: false
          }
        }
      }
    },
    colors: ['#1ab7ea', '#0084ff', '#39539E'],
    labels: ['运动步数', '卡路里', '睡眠时间'],
    legend: {
      show: true,
      floating: true,
      fontSize: '5px',
      position: 'left',
      offsetX: 0,
      offsetY: 10,
      labels: {
        useSeriesColors: true
      },
      markers: {
        size: 0
      },
      formatter: function (seriesName, opts) {
        return seriesName + ':  ' + opts.w.globals.series[opts.seriesIndex];
      },
      itemMargin: {
        vertical: 3
      }
    }
  }
};

export default chartData;
