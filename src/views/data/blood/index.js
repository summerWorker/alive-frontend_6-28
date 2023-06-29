import {Grid} from "@mui/material";
import {gridSpacing} from "../../../store/constant";
import BloodPressureChartCard from "./bloodPressureChartCard";
import {useEffect, useState} from "react";
import {endpoint} from "../../../utils/endpoint";
import * as bloodPressureService from "../../../services/bloodPressureService";
import BloodPressureCard from "./bloodPressureCard";
import BloodSugarChartCard from "./bloodSugarChartCard";


const DataBlood = () => {
    const [weekPressureData, setWeekPressureData] = useState([[140, 90], [130, 87], [135, 91], [141, 87], [138,83], [153, 85], [139, 91]]);
    const [monthPressureData, setMonthPressureData] = useState([]);

    useEffect(() => {
        // get week data
        const today = new Date();
        const past_day = new Date().setDate(today.getDate() - 7);
        const data = {user_id: 1, start_date: past_day, end_date: today};
        const url_week = endpoint + "/api/bloodpressure/week";
        const callback = (data) => {
            if(data.status >= 0){
                setWeekPressureData(data.data);
            }else{
                alert(data.msg);
            }
        }
        bloodPressureService.getWeekBloodPressure(url_week, data, callback).then();
    }, []);

    useEffect(() => {
        // get month data
        const today = new Date();
        const past_day = new Date().setDate(today.getDate() - 30);
        const data = {user_id: 1, start_date: past_day, end_date: today};
        const url_month = endpoint + "/api/bloodpressure/month";
        const callback = (data) => {
            if(data.status >= 0){
                setMonthPressureData(data.data);
            }else{
                alert(data.msg);
            }
        }
        bloodPressureService.getMonthBloodPressure(url_month, data, callback).then();
    }, []);


    return (
      <Grid container spacing={gridSpacing}>
        <Grid item lg={6} xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <BloodPressureChartCard weekData={weekPressureData}
                                      monthData={monthPressureData}
              />
            </Grid>
            <Grid item xs={12}>
              <BloodPressureCard />
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <BloodSugarChartCard />
            </Grid>
            <Grid item xs={12}>

            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
};

export default DataBlood;