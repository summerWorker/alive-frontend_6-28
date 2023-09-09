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
import { addStepsData, getStepsData } from '../../../service/dataService/stepsService';
import StepsAddCard from './stepAddCard';
import * as heightService from '../../../service/dataService/heightService';
import { endpoint } from '../../../utils/endpoint';
import StepAddCard from './stepAddCard';
import GoalAddCard from './goalAddCard';
import DistanceAddCard from './distanceAddCard';
import CaloriesAddCard from './caloriesAddCard';
const { RangePicker } = DatePicker;
const dateFormat = 'MM-DD';
const weekFormat = 'MM-DD';
const monthFormat = 'YYYY-MM-DD';
const infoFormat = 'YYYY-MM-DD';

function DataSteps() {
  const [chooseState, setChooseState] = useState('day');
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    setChooseState('day');
    setStartTime(dayjs().format(infoFormat));
    setEndTime(dayjs().format(infoFormat));
    getStepsData(dayjs().format(infoFormat), dayjs().format(infoFormat)).then((res) => {
      if (res && res.status === 1) {
        setData(res.data.steps);
      }
    });
  }, []);

  useEffect(() => {
    getStepsData(startTime, endTime).then((res) => {
      if (res && res.status === 1) {
        setData(res.data.steps);
      }
    });
  }, [startTime, endTime, chooseState]);

  const handleStateChange = (value) => {
    setChooseState(value);
    if (value === 'day') {
      setStartTime(dayjs().format(infoFormat));
      setEndTime(dayjs().format(infoFormat));
    }
    if (value === 'week') {
      setStartTime(dayjs().add(-7, 'd').format(infoFormat));
      setEndTime(dayjs().format(infoFormat));
    }
    if (value === 'month') {
      setStartTime(dayjs().add(-1, 'month').format(infoFormat));
      setEndTime(dayjs().format(infoFormat));
    }
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={8} sm={12} xs={12}>
          <Grid container spacing={3}>
            <Grid item lg={12} sm={12} xs={12}>
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
                        handleStateChange(value);
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
                        value={dayjs(startTime)}
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
                          setStartTime(date.format(infoFormat));
                          setEndTime(date.format(infoFormat));
                        }}
                      />
                    )}
                    {chooseState === 'week' && (
                      <RangePicker
                        value={[dayjs(startTime), dayjs(endTime)]}
                        disabled={[true, false]}
                        onChange={(date) => {
                          setStartTime(date[1].add(-7, 'd').format(infoFormat));
                          setEndTime(date[1].format(infoFormat));
                        }}
                      />
                    )}
                    {chooseState === 'month' && (
                      <RangePicker
                        value={[dayjs(startTime), dayjs(endTime)]}
                        disabled={[true, false]}
                        onChange={(date) => {
                          setStartTime(date[1].add(-30, 'day').format(infoFormat));
                          setEndTime(date[1].format(infoFormat));
                        }}
                      />
                    )}
                  </Grid>
                  <Grid item></Grid>
                </Grid>
              </div>
              <StepsCharts
                chooseState={chooseState}
                setChooseState={(state) => setChooseState(state)}
                startTime={startTime}
                endTime={endTime}
                data={data}
              />
            </Grid>
            {chooseState === 'day' && (
              <Grid item lg={12} sm={12} xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} lg={6}>
                    <DistanceAddCard />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <CaloriesAddCard />
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item lg={4} sm={12} xs={12}>
          {chooseState === 'day' && (
            <Grid container spacing={3} direction={'column'}>
              <Grid item xs={12}>
                <StepsGoal data={data} />
              </Grid>
              <Grid item xs={12}>
                <StepAddCard />
              </Grid>
              <Grid item xs={12}>
                <GoalAddCard />
              </Grid>
              <Grid item xs={12}>
                <StepsDetails data={data} />
              </Grid>
            </Grid>
          )}
          {(chooseState === 'month' || chooseState === 'week') && (
            <>
              <Grid container spacing={3} direction={'column'}>
                <Grid item>
                  <StepsTrend startTime={startTime} endTime={endTime} data={data} />
                </Grid>
                <Grid item>
                  <ReachGoalCondition startTime={startTime} endTime={endTime} data={data} />
                </Grid>
                <Grid item>
                  <AllDistance startTime={startTime} endTime={endTime} data={data} />
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
