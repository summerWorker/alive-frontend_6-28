import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, MenuItem, TextField } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// chart data
import { heartRateData } from './chart-data/total-growth-bar-chart';
import dayjs from 'dayjs';
import { getHeartRateData } from '../../../service/dataService/heartRateService';
import { desolveHeartRateData } from '../../../utils/heartRateUtils';
import { getWeight } from '../../../service/dataService/weightService';
import { desolveWeightData } from '../../../utils/weightUtils';
import { getStepsData } from '../../../service/dataService/stepsService';
import { desolveStepsData } from '../../../utils/stepsUtils';
import { getSleepData } from '../../../service/dataService/sleepService';
import { desolveSleepTimeData } from '../../../utils/sleepTimeUtils';

const status = [
  {
    value: 'week',
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
  const [value, setValue] = useState('week');
  const [chartData, setChartData] = useState(heartRateData);
  const [data, setData] = useState([]);
  const [label, setLabel] = useState([]);
  const [name, setName] = useState();
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
    let endDate = dayjs().format('YYYY-MM-DD');
    let startDate;
    let currentDate;
    let newData;
    let newLabel = [];
    const weekDay = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const month = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
    switch (value) {
      case 'week':
        startDate = dayjs().add(-6, 'day').format('YYYY-MM-DD');
        currentDate = dayjs(startDate);
        while (currentDate.isSame(dayjs(endDate), 'day') || currentDate.isBefore(dayjs(endDate), 'day')) {
          newLabel.push(weekDay[currentDate.day()]);
          currentDate = currentDate.add(1, 'day');
        }
        setLabel(newLabel);
        break;
      case 'month':
        startDate = dayjs().add(-29, 'day').format('YYYY-MM-DD');
        currentDate = dayjs(startDate);
        while (currentDate.isSame(dayjs(endDate), 'day') || currentDate.isBefore(dayjs(endDate), 'day')) {
          newLabel.push(dayjs(currentDate).format('MM-DD'));
          currentDate = currentDate.add(1, 'day');
        }
        setLabel(newLabel);
        break;
      case 'year':
        startDate = dayjs().add(-1, 'year').add(1, 'month').startOf('month').format('YYYY-MM-DD');
        let currentMonth = dayjs(startDate).month();
        for (let i = 0; i < 12; i++) {
          newLabel.push(month[currentMonth]);
          currentMonth = (currentMonth + 1) % 12;
        }
        setLabel(newLabel);
        break;
    }
    switch (infoData) {
      case 'heartRate':
        setName('心率');
        getHeartRateData(startDate, endDate).then((res) => {
          newData = res.data.heartRates;
          setData(desolveHeartRateData(dayjs(startDate), dayjs(endDate), newData, value));
        });
        break;
      case 'weight':
        setName('体重');
        getWeight('http://localhost:8081/period_weight', { user_id: 1, start_date: startDate, end_date: endDate }, (res) => {
          if (res.status >= 0) {
            newData = res.data.weights;
            setData(desolveWeightData(dayjs(startDate), dayjs(endDate), newData, value));
          } else {
            alert(res.msg);
          }
        });
        break;
      case 'steps':
        setName('运动步数');
        getStepsData(startDate, endDate).then((res) => {
          if (res && res.status === 1) {
            newData = res.data.steps;
            setData(desolveStepsData(dayjs(startDate), dayjs(endDate), newData, value));
          }
        });
        break;
      case 'sleepTime':
        setName('睡眠时间');
        getSleepData(1, startDate, endDate).then((res) => {
          if (res && res.status === 1) {
            newData = res.data.sleep_detail;
            setData(desolveSleepTimeData(dayjs(startDate), dayjs(endDate), newData, value));
          }
        });
        break;
    }
  }, [value, infoData]);
  useEffect(() => {
    let text;
    let accuracy;
    switch (infoData) {
      case 'heartRate':
        accuracy = 0;
        text = '心率(/min)';
        break;
      case 'weight':
        accuracy = 1;
        text = '体重(kg)';
        break;
      case 'steps':
        accuracy = 0;
        text = '运动步数';
        break;
      case 'sleepTime':
        accuracy = 2;
        text = '睡眠时间(h)';
        break;
    }
    setChartData({
      ...chartData,
      options: {
        ...chartData.options,
        dataLabels: {
          enabled: true,
          formatter: function (num, { seriesIndex, dataPointIndex, w }) {
            return num.toFixed(accuracy); // 保留两位小数
          }
        },
        xaxis: {
          ...chartData.options.xaxis,
          categories: label
        },
        title: {
          ...chartData.options.title,
          text: text
        }
      },
      series: [
        {
          name: name,
          data: data
        }
      ]
    });
  }, [data, name, label]);
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
                  <TextField
                    id="standard-select-currency"
                    select
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value);
                    }}
                  >
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
