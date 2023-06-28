const chartData = {
  type: 'bar',
  height: 120,
  options: {
    chart: {
      stacked: true,
      stackType: '100%',
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: true
      }
    },
    stroke: {
      width: 1,
      colors: ['#fff']
    },
    // tooltip: {
    //   show: false
    // },
    fill: {
      opacity: 1
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      offsetX: 40
    },
    xaxis: {
      labels: {
        show: false
      },
      axisTicks: {
        show: false
      },
      axisBorder: {
        show: false
      }
    },
    yaxis: {
      labels: {
        show: false
      },
      axisTicks: {
        show: false
      },
      axisBorder: {
        show: false
      }
    }
  },
  series: [
    {
      name: 'too thin',
      data: [25.0]
    },
    {
      name: 'normal',
      data: [25.0]
    },
    {
      name: 'overweight',
      data: [25.0]
    },
    {
      name: 'obese',
      data: [25.0]
    }
  ]
};

export default chartData;
