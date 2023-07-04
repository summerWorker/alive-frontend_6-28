import { StepsGoal } from './stepsGoal';
import { StepsCharts } from './stepsCharts';
import { Grid } from '@mui/material';
import { StepsDetails } from './stepsDetails';
import { useEffect, useState } from 'react';
import { StepsTrend } from './stepsTrend';
import { ReachGoalCondition } from './reachGoalCondition';
import { AllDistance } from './allDistance';
import { DatePicker, Segmented } from 'antd';
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;
const dateFormat = 'MM-DD';
const weekFormat = 'MM-DD';
const monthFormat = 'YYYY-MM-DD';

function DataSteps() {
  const [chooseState, setChooseState] = useState('day');
  const [nowDate, setNowDate] = useState();
  const [startWeekDate, setStartWeekDate] = useState();
  const [endWeekDate, setEndWeekDate] = useState();
  const [startMonthDate, setStartMonthDate] = useState();
  const [endMonthDate, setEndMonthDate] = useState();

  useEffect(() => {
    setChooseState('day');
    setNowDate(dayjs().format(dateFormat));
    setStartWeekDate(dayjs().add(-7, 'd').format(weekFormat));
    setEndWeekDate(dayjs().format(weekFormat));
    setStartMonthDate(dayjs().add(-30, 'd').format(monthFormat));
    setEndMonthDate(dayjs().format(monthFormat));
  }, []);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={8}>
          <div style={{ background: '#ffffff', padding: '20px', borderRadius: '10px' }}>
            <Grid container spacing={3} justifyContent={'space-between'}>
              <Grid item></Grid>
              <Grid item style={{ flex: '0.5' }}>
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
                ></Segmented>
              </Grid>
              <Grid item></Grid>
            </Grid>
            <Grid container justifyContent={'space-between'} style={{ marginTop: '20px' }}>
              <Grid item></Grid>
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
                    renderExtraFooter={() => (
                      <>
                        <div style={{ textAlign: 'center' }}>选一个叭 ^_^</div>
                      </>
                    )}
                    onChange={(date) => {
                      setNowDate(date.format(dateFormat));
                    }}
                  />
                )}
                {chooseState === 'week' && (
                  <RangePicker
                    value={[dayjs(startWeekDate), dayjs(endWeekDate)]}
                    format={weekFormat}
                    disabled={[true, false]}
                    onChange={(date) => {
                      setStartWeekDate(date[1].add(-7, 'd').format(weekFormat));
                      setEndWeekDate(date[1].format(weekFormat));
                    }}
                  />
                )}
                {chooseState === 'month' && (
                  <RangePicker
                    value={[dayjs(startMonthDate), dayjs(endMonthDate)]}
                    format={monthFormat}
                    disabled={[true, false]}
                    onChange={(date) => {
                      setStartMonthDate(date[1].add(-30, 'day').format(monthFormat));
                      setEndMonthDate(date[1].format(monthFormat));
                    }}
                  />
                )}
              </Grid>
              <Grid item></Grid>
            </Grid>
          </div>
          <StepsCharts chooseState={chooseState} setChooseState={(state) => setChooseState(state)} />
        </Grid>
        <Grid item lg={4}>
          {chooseState === 'day' && (
            <Grid container spacing={3} direction={'column'}>
              <Grid item>
                <StepsGoal />
              </Grid>
              <Grid item>
                <StepsDetails />
              </Grid>
            </Grid>
          )}
          {(chooseState === 'month' || chooseState === 'week') && (
            <>
              <Grid container spacing={3} direction={'column'}>
                <Grid item>
                  <StepsTrend
                    startTime={chooseState === 'week' ? startWeekDate : startMonthDate}
                    endTime={chooseState === 'week' ? endWeekDate : endMonthDate}
                  />
                </Grid>
                <Grid item>
                  <ReachGoalCondition
                    startTime={chooseState === 'week' ? startWeekDate : startMonthDate}
                    endTime={chooseState === 'week' ? endWeekDate : endMonthDate}
                  />
                </Grid>
                <Grid item>
                  <AllDistance
                    startTime={chooseState === 'week' ? startWeekDate : startMonthDate}
                    endTime={chooseState === 'week' ? endWeekDate : endMonthDate}
                  />
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default DataSteps;
