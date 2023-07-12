import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, MenuItem, TextField, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// chart data
import { heightData, weightData, stepsData, sleepTimeData } from './chart-data/total-growth-bar-chart';

const status = [
  {
    value: 'today',
    label: '本周'
  },
  {
    value: 'month',
    label: '本月'
  },
  {
    value: 'year',
    label: '本年'
  }
];

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const DataInfoChart = ({ isLoading, infoData }) => {
  const [value, setValue] = useState('today');
  const [chartData, setChartData] = useState(heightData);
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);

  const { navType } = customization;
  const { primary } = theme.palette.text;
  const darkLight = theme.palette.dark.light;
  const grey200 = theme.palette.grey[200];
  const grey500 = theme.palette.grey[500];

  const primary200 = theme.palette.primary[200];
  const primaryDark = theme.palette.primary.dark;
  const secondaryMain = theme.palette.secondary.main;
  const secondaryLight = theme.palette.secondary.light;

  useEffect(() => {
    const newChartData = {
      ...chartData.options,
      colors: [primary200, primaryDark, secondaryMain, secondaryLight],
      xaxis: {
        labels: {
          style: {
            colors: [primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary]
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: [primary]
          },
          formatter: (value) => {
            return Math.round(value).toString(); // 格式化为整数
          }
        }
      },
      grid: {
        borderColor: grey200
      },
      tooltip: {
        theme: 'light'
      },
      legend: {
        labels: {
          colors: grey500
        }
      }
    };

    // do not load chart when loading
    if (!isLoading) {
      ApexCharts.exec(`bar-chart`, 'updateOptions', newChartData);
    }
  }, [navType, primary200, primaryDark, secondaryMain, secondaryLight, primary, darkLight, grey200, isLoading, grey500]);
  useEffect(() => {
    let newChartData;
    switch (infoData) {
      case 'height':
        newChartData = {
          series: heightData.series,
          options: {
            ...chartData.options,
            title: heightData.options.title,
            dataLabels: heightData.options.dataLabels
          }
        };
        break;
      case 'weight':
        newChartData = {
          series: weightData.series,
          options: {
            ...chartData.options,
            title: weightData.options.title,
            dataLabels: weightData.options.dataLabels
          }
        };
        break;
      case 'steps':
        newChartData = {
          series: stepsData.series,
          options: {
            ...chartData.options,
            title: stepsData.options.title,
            dataLabels: stepsData.options.dataLabels
          }
        };
        break;
      case 'sleepTime':
        newChartData = {
          series: sleepTimeData.series,
          options: {
            ...chartData.options,
            title: sleepTimeData.options.title,
            dataLabels: sleepTimeData.options.dataLabels
          }
        };
        break;
      default:
        newChartData = {
          series: heightData.series,
          options: {
            ...chartData.options,
            title: heightData.options.title,
            dataLabels: heightData.options.dataLabels
          }
        };
    }
    // 不在加载过程中时才更新图表数据
    if (!isLoading) {
      setChartData({
        ...chartData,
        series: newChartData.series,
        options: newChartData.options
      });
    }
  }, [infoData]);

  return (
    <>
      {isLoading ? (
        <SkeletonTotalGrowthBarChart />
      ) : (
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <TextField id="standard-select-currency" select value={value} onChange={(e) => setValue(e.target.value)}>
                    {status.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Chart {...chartData} />
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

DataInfoChart.propTypes = {
  isLoading: PropTypes.bool,
  infoData: PropTypes.string
};

export default DataInfoChart;
