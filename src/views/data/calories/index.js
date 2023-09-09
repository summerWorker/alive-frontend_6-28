import DetailedCard from './detailedCard';
import { Grid } from '@mui/material';
import { Statistic, Button, DatePicker, Segmented } from 'antd';
import DietaryDistribution from './DietaryDistribution';
import DietaryTips from './dietaryTips';
import RecommendRecipe from './recommendRecipe';
import { useEffect, useState } from 'react';
import { FoodList } from './foodList';
import { DietList } from './dietList';
import dayjs from 'dayjs';
import { getDietService } from '../../../service/dataService/dietService';
import { ExerciseList } from './exerciseList';
import { WorkOutList } from './workOutList';
import { CaloriesChart } from './caloriesChart';
import { getWorkOutService } from '../../../service/dataService/workOutService';

const { RangePicker } = DatePicker;
const infoFormat = 'YYYY-MM-DD';
const DataCalories = () => {
  const data1 = [2330, 2440, 2500, 2849, 3060, 2870, 1991];
  const data2 = [2100, 1005, 1800, 3322, 560, 1270, 2000];
  const data3 = data1.map((value, index) => value - data2[index]);
  const average_data3 = data3.reduce((a, b) => a + b, 0) / data3.length;

  const distribute = [65, 15, 20];
  const labels = ['碳水化合物', '蛋白质', '脂肪'];

  //0表示初始界面，1表示食物数据界面，2表示运动数据界面
  const [pageState, setPageState] = useState(0);
  const [chooseState, setChooseState] = useState('week');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [dietData, setDietData] = useState([]);
  const [workOutData, setWorkOutData] = useState([]);

  useEffect(() => {
    setStartTime(dayjs().add(-7, 'd').format(infoFormat));
    setEndTime(dayjs().format(infoFormat));
    setChooseState('week');
  }, []);

  useEffect(() => {
    if (startTime !== '' && endTime !== '') {
      getDietService(startTime, endTime).then((res) => {
        console.log(res);
        if (res && res.status === 1 && res.data && res.data.diet_list) {
          setDietData(res.data.diet_list);
        } else {
          setDietData([]);
        }
      });
      getWorkOutService(startTime, endTime).then((res) => {
        console.log(res);
        if (res && res.status === 1 && res.data && res.data.workout_list) {
          setWorkOutData(res.data.workout_list);
        } else {
          setDietData([]);
        }
      });
    }
  }, [startTime, endTime]);

  const handleStateChange = (value) => {
    setChooseState(value);
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
      {pageState === 0 && (
        <>
          <Grid container spacing={3}>
            <Grid item lg={8}>
              <Grid container spacing={3} direction={'column'}>
                <Grid item>
                  <div style={{ background: '#ffffff', padding: '20px', borderRadius: '10px' }}>
                    <>
                      <Button
                        onClick={() => {
                          setPageState(1);
                        }}
                      >
                        饮食摄入
                      </Button>
                      <Button
                        onClick={() => {
                          setPageState(2);
                        }}
                      >
                        运动消耗
                      </Button>
                    </>
                    <Grid container spacing={3} direction={'column'}>
                      <Grid item>
                        <Grid container spacing={3} justifyContent={'space-between'}>
                          <Grid item></Grid>
                          <Grid item style={{ flex: '0.5' }}>
                            <Segmented
                              block
                              options={[
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
                      </Grid>
                      <Grid item>
                        <Grid container spacing={3} justifyContent={'space-between'}>
                          <Grid item></Grid>
                          <Grid item style={{ flex: '0.5' }}>
                            {chooseState === 'week' ? (
                              <>
                                <RangePicker
                                  value={[dayjs(startTime), dayjs(endTime)]}
                                  onChange={(value) => {
                                    setStartTime(value[1].add(-7, 'd').format(infoFormat));
                                    setEndTime(value[1].format(infoFormat));
                                  }}
                                  disabled={[true, false]}
                                ></RangePicker>
                              </>
                            ) : (
                              <>
                                <RangePicker
                                  value={[dayjs(startTime), dayjs(endTime)]}
                                  onChange={(value) => {
                                    setStartTime(value[1].add(-1, 'm').format(infoFormat));
                                    setEndTime(value[1].format(infoFormat));
                                  }}
                                  disabled={[true, false]}
                                ></RangePicker>
                              </>
                            )}
                          </Grid>
                          <Grid item></Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </div>

                  {pageState === 1 ? (
                    <FoodList />
                  ) : (
                    <CaloriesChart
                      chooseState={chooseState}
                      setChooseState={(state) => setChooseState(state)}
                      startTime={startTime}
                      endTime={endTime}
                      dietData={dietData}
                      workOutData={workOutData}
                    />
                  )}
                </Grid>
                <Grid item>{pageState === 1 && <RecommendRecipe />}</Grid>
              </Grid>
            </Grid>

            <Grid item lg={4}>
              <Grid container spacing={3} direction={'column'}>
                <Grid item>{pageState === 1 && <DietList />}</Grid>
                <Grid item>{pageState === 0 && <DietaryDistribution state={chooseState} data={dietData} />}</Grid>
                <Grid item>
                  <DietaryTips />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
      {pageState === 1 && (
        <>
          <Grid container spacing={3}>
            <Grid item lg={6}>
              <FoodList />
            </Grid>
            <Grid item lg={6}>
              <DietList />
            </Grid>
          </Grid>
        </>
      )}
      {pageState === 2 && (
        <>
          <Grid container spacing={3}>
            <Grid item lg={6}>
              <ExerciseList />
            </Grid>
            <Grid item lg={6}>
              <WorkOutList />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};
export default DataCalories;
