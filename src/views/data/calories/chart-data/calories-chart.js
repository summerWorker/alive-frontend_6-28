export const getDetailChartData = (intakeData, consumptionData) => {
  const netIntakeData = intakeData.map((value, index) => value - consumptionData[index]);
  const categries = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];

  const optionData = {
    type: 'area',
    height: 400,
    options: {
      chart: {
        id: 'calorie-detail',
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        },
        sparkline: {
          enabled: false // false:显示详细的坐标数据，true:只显示一条折线
        }
      },
      dataLabels: {
        enabled: false,
        background: {
          enabled: false,
          margin: 2
        }
      },
      stroke: {
        curve: 'smooth',
        width: 1.5
      },
      tooltip: {
        theme: 'light',
        fixed: {
          enabled: false
        },
        x: {
          show: true
        },
        y1: {
          title: '摄入量'
        },
        y2: {
          title: '消耗量'
        },
        y3: {
          title: '净摄入量'
        },
        marker: {
          show: true
        }
      },
      xaxis: {
        categories: categries
      }
    },
    series: [
      {
        name: '摄入量',
        data: intakeData
      },
      {
        name: '消耗量',
        data: consumptionData
      },
      {
        name: '净摄入量',
        data: netIntakeData
      }
    ]
  };

  return { ...optionData };
};
