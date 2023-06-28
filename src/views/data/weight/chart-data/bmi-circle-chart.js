const chartData = {
  height: 240,
  type: 'radialBar',
  series: [20.0],
  options: {
    responsive: [
      {
        breakpoint: 50.0,
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
        offsetY: 15,
        startAngle: -90,
        endAngle: 90,
        hollow: {
          margin: 5,
          size: '70%',
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
    colors: ['#0084ff'],
    labels: ['BMI'],
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
        vertical: 0
      }
    }
  }
};

export default chartData;
