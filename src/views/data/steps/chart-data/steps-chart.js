export const dayStepsData = {
  type: 'line',
  height: 350,
  options: {
    xaxis: {
      categories: [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
        '23',
        '24'
      ],
      labels: {
        show: true,
        formatter: function (value) {
          if (value === '0' || value === '4' || value === '8' || value === '12' || value === '16' || value === '20' || value === '24') {
            return value; // 显示原始值
          } else {
            return ''; // 隐藏其他标签
          }
        }
      }
    },
    stroke: {
      curve: 'smooth'
    }
  },
  series: [
    {
      name: '步数',
      data: [0, 0, 0, 150, 230, 250, 156, 155, 120, 156, 841, 561, 21, 15, 0, 156, 78, 78, 78, 15, 5, 15, 0, 0, 0]
    }
  ]
};

export const weekStepsData = {
  type: 'line',
  height: 350,
  options: {
    xaxis: {
      categories: ['星期五', '星期六', '星期日', '星期一', '星期二', '星期三', '星期四']
    }
  },
  series: [
    {
      name: '步数',
      data: [456, 15, 120, 150, 230, 250, 156]
    }
  ]
};

export const monthStepsData = {
  type: 'line',
  height: 350,
  options: {
    xaxis: {
      categories: [
        '6/1',
        '6/2',
        '6/3',
        '6/4',
        '6/5',
        '6/6',
        '6/7',
        '6/8',
        '6/9',
        '6/10',
        '6/11',
        '6/12',
        '6/13',
        '6/14',
        '6/15',
        '6/16',
        '6/17',
        '6/18',
        '6/19',
        '6/20',
        '6/21',
        '6/22',
        '6/23',
        '6/24',
        '6/25',
        '6/26',
        '6/27',
        '6/28',
        '6/29',
        '今天'
      ],
      labels: {
        show: true,
        formatter: function (value) {
          if (
            value === '6/1' ||
            value === '6/5' ||
            value === '6/10' ||
            value === '6/15' ||
            value === '6/20' ||
            value === '6/25' ||
            value === '今天'
          ) {
            return value; // 显示原始值
          } else {
            return ''; // 隐藏其他标签
          }
        }
      }
    }
  },
  series: [
    {
      name: '步数',
      data: [0, 0, 0, 150, 230, 250, 156, 155, 120, 156, 841, 561, 21, 15, 0, 156, 78, 78, 78, 15, 5, 15, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  ]
};
