import { useEffect, useState } from 'react';

// material-ui
import {Card, Grid, List, ListItem, ListItemText, Typography} from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';
import TotalWeightLineChart from './TotalWeightLineChart';
import WeightGoalSetCard from './WeightGoalSetCard';
import WeightConditionCard from './WeightConditionCard';
// import BmiCard from "./bmiCard";
import getBmiChart from "./chart-data/bmi-chart";
import WeightLossCard from "./WeightLossCard";
import SmallTipCard from "./smallTipCard";
import { endpoint } from "../../../utils/endpoint";
import * as weightService from "../../../services/weightService";
import Chart from "react-apexcharts";
import MainCard from "../../../ui-component/cards/MainCard";
import {getWeekWeight} from "../../../services/weightService";


const DataWeight = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  const [goal, setGoal] = useState(50);
  const [currentWeight, setCurrentWeight] = useState(50);
  useEffect(() => {
    // get current weight & goal
    const userData = {user_id: 1};
    const url1 = endpoint + "/api/weight/getWeightGoal";
    const callback1 = (data) => {
      if(data.status >= 0){
        setGoal(data.data.goal);
        setCurrentWeight(data.data.currentWeight);
      }else{
        alert(data.msg);
      }
    }
    weightService.getWeightandGoal(url1, userData, callback1).then();
  }, []);


  const [weekData, setWeekData] = useState([51, 52, 51.2, null, 51.0, 50.9, 51.1]);
  const [monthData, setMonthData] = useState([51, 52, 51.2, 52.1, 51.0, 50.9, 51.1, 51, 52, 51.2, 52.1, 51.0, 50.9, 51.1, 51, 52, 51.2, 52.1, 51.0, 50.9, 51.1, 51, 52, 51.2, 52.1, 51.0, 50.9, 51.1]);

  useEffect(() => {
    // get week data
    const today = new Date();
    const past_day = new Date().setDate(today.getDate() - 7);
    const data = {user_id: 1, start_date: past_day, end_date: today};
    const url_week = endpoint + "/api/weight/week";
    const callback = (data) => {
      if(data.status >= 0){
        // let week_data = [];
        // for(let i = 0; i < 7; ++i){
        //
        // }
        setWeekData(data.data);
      }else{
        alert(data.msg);
      }
    }
    weightService.getWeekWeight(url_week, data, callback).then();
  }, []);

  useEffect(() => {
    //get month data
    const today = new Date();
    const past_day = new Date().setDate(today.getDate() - 30);
    const data = {user_id: 1, start_date: past_day, end_date: today};
    const url_month = endpoint + "/api/weight/month";
    const callback = (data) => {
      if(data.status >= 0){
        setMonthData(data.data);
      }else{
        alert(data.msg);
      }
    }
    weightService.getWeightByMonth(url_month, data, callback).then();
  })


  const [yearData, setYearData] = useState([51.0, 51.2, 50.8, 50.3, 50.4, 50.2, 50.2, 50.3, 51.0, 51.2, 50.8, 50.3]);
  useEffect(() => {
    //get year data
    const currentMonth = new Date().getMonth();
    const data = {user_id: 1, date: currentMonth};
    const url = endpoint + "/api/weight/year";
    const callback = (data) => {
      if(data.status >= 0){
        setYearData(data.data);
      }else{
        alert(data.msg);
      }
    }
    weightService.getWeightByMonth(url, data, callback).then();
  }, []);


  // goal
  function updateGoal(value){
    setGoal(value);
    // console.log(goal);
  }


  return (
    <Grid container spacing={gridSpacing}>
      <Grid item lg={8} xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <TotalWeightLineChart isLoading={isLoading}
                                  goal={goal}
                                  currentW={currentWeight}
                                  weekWeight={weekData}
                                  monthWeight={monthData}
                                  yearWeight={yearData}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item lg={6} xs={12}>
                <MainCard border={false} content={false}>
                  <List sx={{ py: 0 }} style={{marginTop: "5%", marginLeft: "5%"}}>
                    <ListItem alignItems="center" disableGutter sx={{ py: 0 }}>
                      <ListItemText
                          sx={{
                            py: 0,
                            mt: 0.45,
                            mb: 0.45
                          }}
                          primary={<Typography variant="h4">Your BMI</Typography>}
                      >
                      </ListItemText>
                    </ListItem>
                  </List>
                  <List sx={{py: 0}} style={{marginRight: "5%"}}>
                    <Chart {...getBmiChart(17.0)} />
                  </List>
                </MainCard>
              </Grid>
              <Grid item lg={6} xs={12}>
                <WeightLossCard />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={4} xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <WeightConditionCard />
          </Grid>
          <Grid item xs={12}>
            <WeightGoalSetCard goal={goal} updateGoal={updateGoal}/>
          </Grid>
          <Grid item xs={12}>
            <SmallTipCard />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DataWeight;
