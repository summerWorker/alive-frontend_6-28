import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { Grid } from '@mui/material';

// third-party
import Chart from 'react-apexcharts';

// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

import { Segmented, DatePicker } from 'antd';
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;

// chart data
import { heartRateData } from './chart-data/total-growth-bar-chart';
import { getHeartRateData } from '../../../service/dataService/heartRateService';
import { desolveHeartRateData } from '../../../utils/heartRateUtils';

const dateFormat = 'YYYY-MM-DD';
const weekFormat = 'YYYY-MM-DD';
const monthFormat = 'YYYY-MM-DD';

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const HeartRateChart = ({ isLoading }) => {
  const [chooseState, setChooseState] = useState('day');
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState(heartRateData);
  const [nowDate, setNowDate] = useState(dayjs().format(dateFormat));
  const [startWeekDate, setStartWeekDate] = useState(dayjs().add(-6, 'day').format(weekFormat));
  const [endWeekDate, setEndWeekDate] = useState(dayjs().format(weekFormat));
  const [startMonthDate, setStartMonthDate] = useState(dayjs().add(-29, 'day').format(monthFormat));
  const [endMonthDate, setEndMonthDate] = useState(dayjs().format(monthFormat));
  const customization = useSelector((state) => state.customization);

  useEffect(() => {
    let newData;
    switch (chooseState) {
      case 'day':
        getHeartRateData(nowDate, null).then((res) => {
          newData = res;
          setData(desolveHeartRateData(dayjs(nowDate), dayjs(nowDate).add(1, 'day'), newData.data.heartRates, 'day'));
        });
        break;
      case 'week':
        getHeartRateData(startWeekDate, endWeekDate).then((res) => {
          newData = res;
          setData(desolveHeartRateData(dayjs(startWeekDate), dayjs(endWeekDate), newData.data.heartRates, 'week'));
        });
        break;
      case 'month':
        getHeartRateData(startMonthDate, endMonthDate).then((res) => {
          newData = res;
          setData(desolveHeartRateData(dayjs(startMonthDate), dayjs(endMonthDate), newData.data.heartRates, 'month'));
        });
        break;
    }
  }, [nowDate, startWeekDate, startMonthDate, endWeekDate, endMonthDate, chooseState]);
  useEffect(() => {
    let label = [];
    let currentDate;
    let endDate;
    const weekDay = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    switch (chooseState) {
      case 'day':
        label = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];
        break;
      case 'week':
        currentDate = dayjs(startWeekDate);
        endDate = dayjs(endWeekDate);
        while (currentDate.isSame(endDate, 'day') || currentDate.isBefore(endDate, 'day')) {
          label.push(weekDay[currentDate.day()]);
          currentDate = currentDate.add(1, 'day');
        }
        break;
      case 'month':
        currentDate = dayjs(startMonthDate); // 当前日期设置为起始日期
        endDate = dayjs(endMonthDate); // 结束日期
        while (currentDate.isSame(endDate, 'day') || currentDate.isBefore(endDate, 'day')) {
          label.push(currentDate.format('MM-DD')); // 将当前日期添加到数组
          currentDate = currentDate.add(1, 'day'); // 增加一天
        }
        break;
    }
    setChartData({
      ...chartData,
      options: {
        ...chartData.options,
        xaxis: {
          ...chartData.options.xaxis,
          categories: label
        }
      },
      series: [
        {
          name: '心率',
          data: data
        }
      ]
    });
  }, [data]);
  return (
    <>
      {isLoading ? (
        <SkeletonTotalGrowthBarChart />
      ) : (
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid container direction={'column'} alignItems="center">
                <Grid item>
                  <Segmented
                    block
                    options={[
                      { label: '日', value: 'day' },
                      { label: '周', value: 'week' },
                      { label: '月', value: 'month' }
                    ]}
                    onChange={(value) => {
                      setChooseState(value);
                    }}
                  />
                </Grid>
                <Grid item>
                  {chooseState === 'day' && (
                    <DatePicker
                      value={dayjs(nowDate)}
                      format={dateFormat}
                      presets={[
                        { label: '昨天', value: dayjs().add(-1, 'd') },
                        { label: '上周', value: dayjs().add(-7, 'd') },
                        { label: '上月', value: dayjs().add(-1, 'month') }
                      ]}
                      onChange={(date) => {
                        setNowDate(date.format(dateFormat));
                      }}
                    />
                  )}
                  {chooseState === 'week' && (
                    <RangePicker
                      value={[dayjs(startWeekDate), dayjs(endWeekDate)]}
                      format={weekFormat}
                      onChange={(date) => {
                        setStartWeekDate(date[1].add(-6, 'd').format(weekFormat));
                        setEndWeekDate(date[1].format(weekFormat));
                      }}
                    />
                  )}
                  {chooseState === 'month' && (
                    <RangePicker
                      value={[dayjs(startMonthDate), dayjs(endMonthDate)]}
                      format={monthFormat}
                      onChange={(date) => {
                        setStartMonthDate(date[1].add(-29, 'day').format(monthFormat));
                        setEndMonthDate(date[1].format(monthFormat));
                      }}
                    />
                  )}
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

HeartRateChart.propTypes = {
  isLoading: PropTypes.bool
};

export default HeartRateChart;
