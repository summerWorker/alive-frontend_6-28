import { SleepTimeChart } from './sleepTimeChart';
import { Grid, Tab, Tabs, IconButton } from '@mui/material';
import { gridSpacing } from 'store/constant';
import { SleepTips } from './sleepTips';
import { SleepGoalCard } from './sleepGoalCard';
import { SleepGoalNextCard } from './sleepGoalNextCard';
import { SleepAbout } from './sleepAbout';
import { Dropdown } from 'antd';
import { FileAddFilled } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { endpoint } from '../../../utils/endpoint';
import * as sleepService from '../../../service/dataService/sleepService';

const dateFormat = 'YYYY-MM-DD';
const weekFormat = 'YYYY-MM-DD';
const monthFormat = 'YYYY-MM-DD';
const timeFormat = 'HH:mm';

function DataSleepTime() {
  const [chooseState, setChooseState] = useState(0);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [bedTime, setBedTime] = useState(dayjs().format(timeFormat));
  const [getUpTime, setGetUpTime] = useState(dayjs().format(timeFormat));
  const [bedTimeGoal, setBedTimeGoal] = useState(dayjs().format(timeFormat));
  const [getUpTimeGoal, setGetUpTimeGoal] = useState(dayjs().format(timeFormat));

  useEffect(() => {
    setStartTime(dayjs().format(dateFormat));
    setEndTime(dayjs().format(dateFormat));
  }, []);

  useEffect(() => {
    setChooseState(0);
    const url = endpoint + '/goals';
    function callback(data) {
      if (data.status >= 0) {
        const goals = data.data.goal;
        let length = 0;
        let curBedTime;
        for (let i = 0; i < goals.length; ++i) {
          const cur_goal = goals[i];
          if (cur_goal.goalName === 'bedtime_goal') {
            curBedTime = cur_goal.goalKey2;
            setBedTime(cur_goal.goalKey2);
            setBedTimeGoal(cur_goal.goalKey2);
          }
          if (cur_goal.goalName === 'sleep_length_goal') {
            length = cur_goal.goalKey1;
          }
        }
        const getUpTimeGoal = dayjs(curBedTime, timeFormat).add(length, 'minute').format(timeFormat);
        setGetUpTime(getUpTimeGoal);
        setGetUpTimeGoal(getUpTimeGoal);
      } else {
        alert(data.msg);
      }
    }
    sleepService.getSleepGoal(url, {}, callback).then();
  }, []);

  const handleTabChange = (e, index) => {
    setChooseState(index);
    if (index === 0) {
      setStartTime(dayjs().format(dateFormat));
      setEndTime(dayjs().format(dateFormat));
    }
    if (index === 1) {
      setStartTime(dayjs().subtract(7, 'day').format(weekFormat));
      setEndTime(dayjs().format(weekFormat));
    }
    if (index === 2) {
      setStartTime(dayjs().subtract(30, 'day').format(monthFormat));
      setEndTime(dayjs().format(monthFormat));
    }
  };

  const items = [
    {
      key: '1',
      label: '添加数据'
    }
  ];

  function updateGoal() {
    function callback(data) {
      if (data.status >= 0) {
        // alert("修改睡眠定时成功！");
        setBedTime(bedTimeGoal);
        setGetUpTime(getUpTimeGoal);
      } else {
        alert(data.msg);
      }
    }
    const url = endpoint + '/set_goal';
    const data = { goalKey2: bedTimeGoal, goalName: 'bedtime_goal' };
    sleepService.setSleepGoal(url, data, callback).then();
    const sleep_length =
      (dayjs(getUpTimeGoal, timeFormat).hour() + 24 - dayjs(bedTimeGoal, timeFormat).hour()) * 60 +
      (dayjs(getUpTimeGoal, timeFormat).minute() - dayjs(bedTimeGoal, timeFormat).minute());
    const data2 = { goalKey1: sleep_length, goalName: 'sleep_length_goal' };
    sleepService.setSleepGoal(url, data2, callback).then();
    alert('修改睡眠定时成功！');
  }

  return (
    <div>
      <Grid container spacing={gridSpacing}>
        <Grid item lg={8} sm={12}>
          <Grid container direction={'column'} spacing={gridSpacing}>
            <Grid item>
              <div style={{ background: '#ffffff', padding: '20px', borderRadius: '10px' }}>
                <h1>睡眠时长</h1>
                <Grid container spacing={2} justifyContent={'space-between'}>
                  <Grid item xm={3}></Grid>
                  <Grid item xm={6}>
                    <Tabs value={chooseState} onChange={(e, index) => handleTabChange(e, index)}>
                      <Tab disableRipple label={'日'} />
                      <Tab disableRipple label={'周'} />
                      <Tab disableRipple label={'月'} />
                    </Tabs>
                  </Grid>
                  <Grid item xm={3}>
                    {/*  <Dropdown*/}
                    {/*    menu={{*/}
                    {/*      items,*/}
                    {/*      selectable: true,*/}
                    {/*      defaultSelectedKeys: ['3']*/}
                    {/*    }}*/}
                    {/*  >*/}
                    {/*    <IconButton>*/}
                    {/*      <FileAddFilled />*/}
                    {/*    </IconButton>*/}
                    {/*  </Dropdown>*/}
                  </Grid>
                </Grid>
              </div>
              <SleepTimeChart
                chooseState={chooseState}
                startTime={startTime}
                endTime={endTime}
                setStartTime={(date) => setStartTime(date)}
                setEndTime={(date) => setEndTime(date)}
              />
            </Grid>
            <Grid item>
              <Grid container spacing={gridSpacing}>
                <Grid item lg={6} sm={6}>
                  <SleepGoalCard
                    bedTime={bedTimeGoal}
                    getUpTime={getUpTimeGoal}
                    updateBedTime={(time) => setBedTimeGoal(time)}
                    updateGetUpTime={(time) => setGetUpTimeGoal(time)}
                    updateGoal={updateGoal}
                  />
                </Grid>
                <Grid item lg={6} sm={6}>
                  <SleepGoalNextCard bedTime={bedTime} getUpTime={getUpTime} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item lg={4} sm={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item lg={12} sm={6}>
              {chooseState === 0 && <SleepTips startTime={startTime} endTime={endTime} />}
            </Grid>
            <Grid item lg={12} sm={6}>
              <SleepAbout />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default DataSleepTime;
