import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Grid, IconButton, Tab, Tabs } from '@mui/material';
import { Dropdown } from 'antd';
import { FileAddFilled } from '@ant-design/icons';

export function SleepTimeRangeBarChart() {
  const theme = useTheme();

  const { primary } = theme.palette.text;
  const darkLight = theme.palette.dark.light;
  const grey200 = theme.palette.grey[200];
  const grey500 = theme.palette.grey[500];

  const primary200 = theme.palette.primary[200];
  const primaryDark = theme.palette.primary.dark;
  const secondaryMain = theme.palette.secondary.main;
  const secondaryLight = theme.palette.secondary.light;

  const dayChartOptions = {
    chart: {
      height: 350,
      toolbar: {
        show: false // 隐藏工具栏
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '95%', // 调整条的高度百分比
        distributed: true, // 分布式布局，使条之间几乎连在一起
        borderRadius: 5 // 设置条的边框圆角
      }
    },
    // colors: [primary200, primaryDark, secondaryMain, secondaryLight],
    xaxis: {
      labels: {
        style: {
          colors: [primary, primary, primary]
        }
      },
      type: 'datetime'
    },
    yaxis: {
      labels: {
        style: {
          colors: [primary]
        }
      }
    },
    grid: {
      borderColor: grey200,
      padding: {
        left: 0,
        right: 10 // 调整右侧内边距
      }
    },
    tooltip: {
      theme: 'light'
    },
    legend: {
      labels: {
        colors: grey500
      }
    },
    dataLabels: {
      enabled: false // 不显示数据标签
    }
  };
  const weekChartOptions = {
    chart: {
      height: 350,
      toolbar: {
        show: false // 隐藏工具栏
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: '95%', // 调整条的高度百分比
        distributed: true, // 分布式布局，使条之间几乎连在一起
        borderRadius: 5 // 设置条的边框圆角
      }
    },
    // colors: [primary200, primaryDark, secondaryMain, secondaryLight],
    xaxis: {
      labels: {
        style: {
          colors: [primary, primary, primary]
        }
      },
      type: 'datetime'
    },
    yaxis: {
      labels: {
        style: {
          colors: [primary]
        }
      }
    },
    grid: {
      borderColor: grey200,
      padding: {
        left: 0,
        right: 10 // 调整右侧内边距
      }
    },
    tooltip: {
      theme: 'light'
    },
    legend: {
      labels: {
        colors: grey500
      }
    },
    dataLabels: {
      enabled: false // 不显示数据标签
    }
  };

  const dayDate = [
    {
      name: '日睡眠时间',
      data: [
        {
          x: '深度睡眠',
          y: [new Date('2023-06-25T09:00:00').getTime(), new Date('2023-06-25T10:30:00').getTime()],
          fillColor: primary200
        },
        {
          x: '深度睡眠',
          y: [new Date('2023-06-25T10:30:00').getTime(), new Date('2023-06-25T11:00:00').getTime()],
          fillColor: primary200
        },
        {
          x: '眼动',
          y: [new Date('2023-06-25T11:00:00').getTime(), new Date('2023-06-25T11:30:00').getTime()],
          fillColor: primaryDark
        },
        {
          x: '眼动',
          y: [new Date('2023-06-25T11:30:00').getTime(), new Date('2023-06-25T12:00:00').getTime()],
          fillColor: primaryDark
        },
        {
          x: '深度睡眠',
          y: [new Date('2023-06-25T12:00:00').getTime(), new Date('2023-06-25T12:45:00').getTime()],
          fillColor: primary200
        },
        {
          x: '浅度睡眠',
          y: [new Date('2023-06-25T12:45:00').getTime(), new Date('2023-06-25T13:30:00').getTime()],
          fillColor: darkLight
        },
        {
          x: '眼动',
          y: [new Date('2023-06-25T13:30:00').getTime(), new Date('2023-06-25T14:15:00').getTime()],
          fillColor: primaryDark
        },
        {
          x: '清醒',
          y: [new Date('2023-06-25T14:15:00').getTime(), new Date('2023-06-25T14:30:00').getTime()],
          fillColor: secondaryMain
        },
        {
          x: '浅度睡眠',
          y: [new Date('2023-06-25T14:30:00').getTime(), new Date('2023-06-25T15:00:00').getTime()],
          fillColor: darkLight
        },
        {
          x: '浅度睡眠',
          y: [new Date('2023-06-25T15:00:00').getTime(), new Date('2023-06-25T15:45:00').getTime()],
          fillColor: darkLight
        },
        {
          x: '眼动',
          y: [new Date('2023-06-25T15:45:00').getTime(), new Date('2023-06-25T16:30:00').getTime()],
          fillColor: primaryDark
        }
      ]
    }
  ];
  const weekDate = [
    {
      name: '周睡眠时间',
      data: [
        {
          x: '周一',
          y: [new Date('2023-06-25T09:00:00').getTime(), new Date('2023-06-25T10:30:00').getTime()],
          fillColor: primary200
        },
        {
          x: '深度睡眠',
          y: [new Date('2023-06-25T10:30:00').getTime(), new Date('2023-06-25T11:00:00').getTime()],
          fillColor: primary200
        },
        {
          x: '眼动',
          y: [new Date('2023-06-25T11:00:00').getTime(), new Date('2023-06-25T11:30:00').getTime()],
          fillColor: primaryDark
        },
        {
          x: '眼动',
          y: [new Date('2023-06-25T11:30:00').getTime(), new Date('2023-06-25T12:00:00').getTime()],
          fillColor: primaryDark
        },
        {
          x: '深度睡眠',
          y: [new Date('2023-06-25T12:00:00').getTime(), new Date('2023-06-25T12:45:00').getTime()],
          fillColor: primary200
        },
        {
          x: '浅度睡眠',
          y: [new Date('2023-06-25T12:45:00').getTime(), new Date('2023-06-25T13:30:00').getTime()],
          fillColor: darkLight
        },
        {
          x: '眼动',
          y: [new Date('2023-06-25T13:30:00').getTime(), new Date('2023-06-25T14:15:00').getTime()],
          fillColor: primaryDark
        },
        {
          x: '清醒',
          y: [new Date('2023-06-25T14:15:00').getTime(), new Date('2023-06-25T14:30:00').getTime()],
          fillColor: secondaryMain
        },
        {
          x: '浅度睡眠',
          y: [new Date('2023-06-25T14:30:00').getTime(), new Date('2023-06-25T15:00:00').getTime()],
          fillColor: darkLight
        },
        {
          x: '浅度睡眠',
          y: [new Date('2023-06-25T15:00:00').getTime(), new Date('2023-06-25T15:45:00').getTime()],
          fillColor: darkLight
        },
        {
          x: '眼动',
          y: [new Date('2023-06-25T15:45:00').getTime(), new Date('2023-06-25T16:30:00').getTime()],
          fillColor: primaryDark
        }
      ]
    }
  ];

  const [tabIndex, setTabIndex] = useState(0);
  const [chartData, setChartData] = useState();
  const [chartOptions, setChartOptions] = useState();
  // useEffect(() => {
  //   setChartData(dayDate);
  //   setChartOptions(dayChartOptions);
  // }, []);

  const handleTabChange = (e, index) => {
    setTabIndex(index);
    // switch (index) {
    //   case 0:
    //     setChartData(dayDate);
    //     setChartOptions(dayChartOptions);
    //     break;
    //   case 1:
    //     setChartData(weekDate);
    //     setChartOptions(weekChartOptions);
    //     break;
    // }
  };

  const items = [
    {
      key: '1',
      label: '添加数据'
    }
  ];

  return (
    <>
      <div style={{ background: '#ffffff', padding: '20px', borderRadius: '10px' }}>
        <h1>睡眠时长</h1>

        <Grid container spacing={2} justifyContent={'space-between'}>
          <Grid item xm={3}></Grid>
          <Grid item xm={6}>
            <Tabs value={tabIndex} onChange={(e, index) => handleTabChange(e, index)}>
              <Tab disableRipple label={'日'} />
              <Tab disableRipple label={'周'} />
              <Tab disableRipple label={'月'} />
              <Tab disableRipple label={'年'} />
            </Tabs>
          </Grid>
          <Grid item xm={3}>
            <Dropdown
              menu={{
                items,
                selectable: true,
                defaultSelectedKeys: ['3']
              }}
            >
              <IconButton>
                <FileAddFilled />
              </IconButton>
            </Dropdown>
          </Grid>
        </Grid>

        <Chart options={dayChartOptions} series={dayDate} type="rangeBar" height={350} />
        {/*{tabIndex === 1 && <Chart options={chartOptions} series={chartData} type="bar" height={350} />}*/}
      </div>
    </>
  );
}
