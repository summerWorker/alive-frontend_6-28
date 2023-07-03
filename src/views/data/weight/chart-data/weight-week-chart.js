const getWeekChartData = (seriesData, goal, category) => {
  const filteredData = seriesData.filter(value => value !== null);

  const chartData = {
    type: 'line',
    height: 270,
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
        position: "front",
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
        categories: category
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
      yaxis: {
        min: Math.min(...filteredData, goal) - 1,
        max: Math.max(...filteredData, goal) + 1
      },
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
      },
      annotations: {
        yaxis: [
          {
            y: goal,
            borderColor: '#00E396',
            label: {
              borderColor: '#00E396',
              style: {
                color: '#fff',
                background: '#00E396'
              },
              text: 'Goal: ' + goal + "kg"
            }
          }
        ]
      }
    },
    series: [
      {
        name: 'Weight',
        data: seriesData
      }
    ]
  };

  return {...chartData};
}

export default getWeekChartData;
