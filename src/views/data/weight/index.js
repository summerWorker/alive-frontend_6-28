import { useEffect, useState } from 'react';

// material-ui
import { Card, Grid, List, ListItem, ListItemText, Typography } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';
import TotalWeightLineChart from './TotalWeightLineChart';
import WeightGoalSetCard from './WeightGoalSetCard';
import WeightConditionCard from './WeightConditionCard';
// import BmiCard from "./bmiCard";
import getBmiChart from './chart-data/bmi-chart';
import WeightLossCard from './WeightLossCard';
import SmallTipCard from './smallTipCard';
import { endpoint } from '../../../utils/endpoint';
import * as weightService from '../../../service/dataService/weightService';
import Chart from 'react-apexcharts';
import MainCard from '../../../ui-component/cards/MainCard';
import dayjs from 'dayjs';
import HeightCard from './HeightCard';
import WeightAddCard from './weightAddCard';
import { integerPropType } from '@mui/utils';
import { getBMI, setWeightGoal } from '../../../service/dataService/weightService';
import { getMainRecord } from '../../../service/dataService/mainRecordService';
import * as mainRecordService from '../../../service/dataService/mainRecordService';
import * as goalService from '../../../service/dataService/goalService';
import HeightAddCard from './heightAddCard';
import * as heightService from '../../../service/dataService/heightService';

const weekFormat = 'YYYY-MM-DD';

const DataWeightAndHeight = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  const [weekData, setWeekData] = useState([]);
  const [monthData, setMonthData] = useState([]);

  const [startTime, setStartTime] = useState(dayjs().subtract(6, 'day').format(weekFormat));
  const [endTime, setEndTime] = useState(dayjs().format(weekFormat));
  const [monthStartTime, setMonthStartTime] = useState(dayjs().subtract(29, 'day').format(weekFormat));

  const month_callback = (data) => {
    // console.log(data);
    if (data.status >= 0) {
      if (data.data.weights.length === 0) {
        setMonthData([]);
      } else {
        // const items = data.data.weight[0].detailValue;
        // console.log(items['items']);
        setMonthData(data.data.weights);
      }
    } else {
      alert(data.msg);
    }
  };

  const week_callback = (data) => {
    if (data.status >= 0) {
      if (data.data.weights.length === 0) {
        setWeekData([]);
      } else {
        // const items = data.data.weight[0].detailValue;
        // console.log(items['items']);
        setWeekData(data.data.weights);
      }
    } else {
      alert(data.msg);
    }
  };

  useEffect(
    (date) => {
      // get week data
      const data = { start_date: startTime, end_date: endTime };
      const url_week = endpoint + '/period_weight';
      const callback = (data) => {
        // console.log(data.data.weights);
        if (data.status >= 0) {
          if (data.data.weights.length === 0) {
            setWeekData([]);
          } else {
            // const items = data.data.weights[0].detailValue;
            // console.log(items);
            setWeekData(data.data.weights);
          }
        } else {
          alert(data.msg);
        }
      };
      weightService.getWeight(url_week, data, callback).then();
    },
    [startTime, endTime]
  );

  useEffect(() => {
    //get month data
    // const tmp_start = dayjs().subtract(7, 'day').format(weekFormat);
    const data = { start_date: monthStartTime, end_date: endTime };
    const url_month = endpoint + '/period_weight';
    weightService.getWeight(url_month, data, month_callback).then();
  }, [monthStartTime, endTime]);

  function updateMonthData() {
    const url_month = endpoint + '/period_weight';
    const data = { start_date: startTime, end_date: endTime };
    weightService.getWeight(url_month, data, month_callback).then();
  }

  function updateWeekData() {
    const url_week = endpoint + '/period_weight';
    const data = { start_date: startTime, end_date: endTime };
    weightService.getWeight(url_week, data, week_callback).then();
  }

  // height
  const [height, setHeight] = useState();
  const [cur_weight, setCurWeight] = useState();
  useEffect(() => {
    const url = endpoint + '/main_record';
    const data = {};
    const callback = (data) => {
      if (data.status >= 0) {
        setHeight(data.data.height);
        setCurWeight(data.data.weight);
      } else {
        alert(data.msg);
      }
    };
    mainRecordService.getMainRecord(url, data, callback).then();
  });

  const [goal, setGoal] = useState();

  useEffect(() => {
    const data = {};
    function callback(data) {
      if (data.status > 0) {
        const goals = data.data.goal;
        for (let i = 0; i < goals.length; ++i) {
          if (goals[i].goalName === 'weight_goal') {
            setGoal(goals[i].goalKey1);
            break;
          }
        }
      } else {
        alert(data.msg);
      }
    }
    goalService.getGoals(endpoint + '/goals', data, callback).then();
  }, [goal]);

  function updateGoal(value) {
    const data = { goalName: 'weight_goal', goalKey1: Number(value) };
    function callback(data) {
      if (data.status >= 0) {
        setGoal(data.data.goalKey1);
      } else {
        alert(data.msg);
      }
    }
    weightService.setWeightGoal(endpoint + '/set_goal', data, callback).then();
  }

  //add weight
  const [addWeightDate, setAddWeightDate] = useState(dayjs().format(weekFormat));
  const [addWeight, setAddWeight] = useState();

  function addWeightData() {
    // console.log(addWeightDate, addWeight, Number(addWeight));
    if (addWeight === undefined || addWeight === null || addWeight === '') {
      alert('请输入体重!');
      return;
    }

      if (addWeight < 0 || addWeight > 300 || Number(addWeight) === null || Number(addWeight) === undefined || isNaN(Number(addWeight))) {
        alert('请输入合理的体重值!');
        return;
      }
    // 获取当前日期和时间
    const currentDate = new Date();

    // 将用户输入的日期和时间转换为 Date 对象
    const userDate = new Date(addWeightDate);

    // 检查日期是否为未来日期
    if (userDate > currentDate) {
      alert("日期不能是未来日期");
      return;
    }
        function callback(data) {
          if (data.status >= 0) {
            alert('体重添加成功!');
            location.reload();
          } else {
            alert(data.msg);
          }
        }
        weightService.addWeight(endpoint + '/add_weight', { weight: Number(addWeight), date: addWeightDate }, callback).then();


  }

  //add height
  const [addHeightDate, setAddHeightDate] = useState(dayjs().format(weekFormat));
  const [addHeight, setAddHeight] = useState();

  function addHeightData() {
    if (addHeight === undefined || addHeight === null || addHeight === '') {
      alert('请输入身高!');
      return;
    }
    if (addHeight < 0 ||addHeight > 3|| Number(addHeight) === null || Number(addHeight) === undefined || isNaN(Number(addHeight))) {
      alert('请输入合理的身高数据!');
      return;
    }
    // 获取当前日期和时间
    const currentDate = new Date();

    // 将用户输入的日期和时间转换为 Date 对象
    const userDate = new Date(addHeightDate);

    // 检查日期是否为未来日期
    if (userDate > currentDate) {
      alert("日期不能是未来日期");
      return;
    }
      function callback(data) {
        if (data.status > 0) {
          alert('身高添加成功!');
          location.reload();
        } else {
          alert(data.msg);
        }
      }
      heightService.addHeight(endpoint + '/add_height', { height: Number(addHeight), date: addHeightDate }, callback).then();

  }

  const [bmi, setBmi] = useState(0);
  const [condition, setCondition] = useState('');
  const [advice, setAdvice] = useState('');
  useEffect(() => {
    const url = endpoint + '/bmi';
    const data = {};
    function callback(data) {
      if (data.status >= 0) {
        setBmi(data.data.bmi.toFixed(2));
        setCondition(data.data.analysis);
        setAdvice(data.data.advice);
      }
    }
    weightService.getBMI(url, data, callback).then();
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item lg={8} xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <TotalWeightLineChart
              isLoading={isLoading}
              goal={goal}
              currentW={cur_weight}
              weekWeight={weekData}
              monthWeight={monthData}
              startTime={startTime}
              monthStartTime={monthStartTime}
              endTime={endTime}
              setStartTime={(date) => setStartTime(date)}
              setMonthStartTime={(date) => setMonthStartTime(date)}
              setEndTime={(date) => setEndTime(date)}
              updateMonthData={updateMonthData}
              updateWeekData={updateWeekData}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item lg={6} xs={12}>
                <MainCard border={false} content={false}>
                  <List sx={{ py: 0 }} style={{ marginTop: '5%', marginLeft: '5%' }}>
                    <ListItem alignItems="center" sx={{ py: 0 }}>
                      <ListItemText
                        sx={{
                          py: 0,
                          mt: 0.45,
                          mb: 0.45
                        }}
                        primary={<Typography variant="h4">您的BMI</Typography>}
                      ></ListItemText>
                    </ListItem>
                  </List>
                  <List sx={{ py: 0 }} style={{ marginRight: '5%' }}>
                    <Chart {...getBmiChart(bmi)} />
                  </List>
                </MainCard>
              </Grid>
              <Grid item lg={6} xs={12}>
                <WeightLossCard advice={advice} condition={condition} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={4} xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <HeightCard height={height} />
          </Grid>
          {/*<Grid item xs={12}>*/}
          {/*  <WeightConditionCard condition={condition} />*/}
          {/*</Grid>*/}
          <Grid item xs={12}>
            <HeightAddCard
              date={addHeightDate}
              setDate={(date) => setAddHeightDate(date)}
              height={addHeight}
              setHeight={(height) => setAddHeight(height)}
              addHeight={addHeightData}
            />
          </Grid>
          <Grid item xs={12}>
            <WeightAddCard
              date={addWeightDate}
              setDate={(date) => setAddWeightDate(date)}
              weight={addWeight}
              setWeight={(weight) => setAddWeight(weight)}
              addWeight={addWeightData}
            />
          </Grid>
          <Grid item xs={12}>
            <WeightGoalSetCard goal={goal} updateGoal={updateGoal} />
          </Grid>
          {/*<Grid item xs={12}>*/}
          {/*  <SmallTipCard advice={advice} />*/}
          {/*</Grid>*/}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DataWeightAndHeight;
