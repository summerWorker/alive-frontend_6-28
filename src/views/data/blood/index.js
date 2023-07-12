import { Grid } from '@mui/material';
import { gridSpacing } from '../../../store/constant';
import BloodPressureChartCard from './bloodPressureChartCard';
import { useEffect, useState } from 'react';
import { endpoint } from '../../../utils/endpoint';
import * as bloodService from '../../../service/dataService/bloodService';
import BloodPressureCard from './bloodPressureCard';
import BloodSugarChartCard from './bloodSugarChartCard';
import BloodSugarCard from './bloodSugarCard';
import dayjs from "dayjs";
import {getBloodPressure} from "../../../service/dataService/bloodService";
import PressureAddCard from "./pressureAddCard";
import SugarAddCard from "./sugarAddCard";

const infoFormat = 'YYYY-MM-DD';
const timeFormat = "HH:mm";

const DataBlood = () => {
  //blood pressure data
  const [weekPressureData, setWeekPressureData] = useState([]);
  const [monthPressureData, setMonthPressureData] = useState([]);

  const [startDatePressure, setStartDatePressure] = useState(dayjs().subtract(6, 'day').format(infoFormat));
  const [endDatePressure, setEndDatePressure] = useState(dayjs().format(infoFormat));
  const [startDatePressureMonth, setStartDatePressureMonth] = useState(dayjs().subtract(29, 'day').format(infoFormat));

  useEffect(() => {
    // get week data
    const data = { user_id: 1, start_date: startDatePressure, end_date: endDatePressure };
    const url_week = endpoint + '/blood_pressure';
    const callback = (data) => {
      if (data.status >= 0) {
        if(data.data.blood_pressure.length === 0){
          setWeekPressureData([]);
        }else{
          setWeekPressureData(data.data.blood_pressure);
        }
      } else {
        alert(data.msg);
      }
    };
    bloodService.getBloodPressure(url_week, data, callback).then();
  }, [startDatePressure, endDatePressure]);

  useEffect(() => {
    // get month data
    const data = { user_id: 1, start_date: startDatePressureMonth, end_date: endDatePressure };
    const url_month = endpoint + '/blood_pressure';
    const callback = (data) => {
      if (data.status >= 0) {
        if(data.data.blood_pressure.length === 0){
            setMonthPressureData([]);
        }else {
          setMonthPressureData(data.data.blood_pressure);
        }
      } else {
        alert(data.msg);
      }
    };
    bloodService.getBloodPressure(url_month, data, callback).then();
  }, [startDatePressureMonth, endDatePressure]);

  //blood sugar data
  const [weekSugarData, setWeekSugarData] = useState([]);
  const [monthSugarData, setMonthSugarData] = useState([]);

  const [startDateSugar, setStartDateSugar] = useState(dayjs().subtract(6, 'day').format(infoFormat));
  const [endDateSugar, setEndDateSugar] = useState(dayjs().format(infoFormat));
  const [startDateSugarMonth, setStartDateSugarMonth] = useState(dayjs().subtract(29, 'day').format(infoFormat));


  useEffect(() => {
    // get week data
    const data = { user_id: 1, start_date: startDateSugar, end_date: endDateSugar };
    const url_week = endpoint + '/blood_sugar';
    const callback = (data) => {
      if (data.status >= 0) {
        if(data.data.blood_sugar.length === 0){
            setWeekSugarData([]);
        }else{
          setWeekSugarData(data.data.blood_sugar);
        }
      } else {
        // alert(data.msg);
      }
    };
    bloodService.getBloodSugar(url_week, data, callback).then();
  }, [startDateSugar, endDateSugar]);

  useEffect(() => {
    // get month data
    const data = { user_id: 1, start_date: startDateSugarMonth, end_date: endDateSugar };
    const url_month = endpoint + '/blood_sugar';
    const callback = (data) => {
      if (data.status >= 0) {
        if(data.data.blood_sugar.length === 0){
            setMonthSugarData([]);
        }else{
            setMonthSugarData(data.data.blood_sugar);
        }
      } else {
        // alert(data.msg);
      }
    };
    bloodService.getBloodSugar(url_month, data, callback).then();
  }, [startDateSugarMonth, endDateSugar]);

  const pressure_callback = (data) => {
    if(data.status >= 0){
      if(data.data.blood_pressure.length === 0){
        setWeekPressureData([]);
      }else{
        setWeekPressureData(data.data.blood_pressure);
      }
    }else{
        alert(data.msg);
    }
  }

  function updatePressureData(timeValue) {
    const url = endpoint + '/blood_pressure';
    const start = (timeValue === true) ? startDatePressure : startDatePressureMonth;
    const data = { user_id: 1, start_date: start, end_date: endDatePressure };
    bloodService.getBloodPressure(url, data, pressure_callback).then();
  }

  const sugar_callback = (data) => {
    if(data.status >= 0){
      if(data.data.blood_sugar.length === 0){
        setWeekSugarData([]);
      }else{
        setWeekSugarData(data.data.blood_sugar);
      }
    }else{
        alert(data.msg);
    }
  }

  function updateSugarDate(timeValue){
    const url = endpoint + '/blood_sugar';
    const start = (timeValue === true) ? startDateSugar : startDateSugarMonth;
    const data = { user_id: 1, start_date: start, end_date: endDateSugar };
    bloodService.getBloodSugar(url, data, sugar_callback).then();
  }

  const [addPressureDate, setAddPressureDate] = useState(dayjs().format(infoFormat));
    const [addPressureSystolic, setAddPressureSystolic] = useState();
    const [addPressureDiastolic, setAddPressureDiastolic] = useState();

    function addPressure(){
      if(addPressureSystolic === undefined || addPressureSystolic === null || addPressureDiastolic === undefined || addPressureDiastolic === null || addPressureDate === undefined){
        alert("Please enter the data");
      }else{
        function callback(data){
          if(data.status >= 0){
            alert("Add successfully!");
            window.location.reload();
          }else{
            alert(data.msg);
          }
        }
        const url = endpoint + '/add_blood_pressure';
        const date = new Date(addPressureDate);
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // 月份从0开始，需要加1
        const day = date.getDate();

        const targetDateString = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        const data = {user_id: 1, date: targetDateString, systolic: Number(addPressureSystolic), diastolic: Number(addPressureDiastolic)};
        bloodService.addBloodPressure(url, data, callback).then();
      }
    }

    const [addSugarDate, setAddSugarDate] = useState(dayjs().format(infoFormat));
    const [addSugarTime, setAddSugarTime] = useState(dayjs().format(timeFormat));
    const [addSugarValue, setAddSugarValue] = useState();

    function addSugar(){
      if(addSugarValue === undefined || addSugarValue === null || addSugarDate === undefined || addSugarTime === undefined) {
        alert("Please enter the data");
      }else{
        function callback(data){
          if(data.status >= 0){
            alert("Add successfully!");
            window.location.reload();
          }else{
            alert(data.msg);
          }
        }
        const url = endpoint + '/add_blood_sugar';
        const date = new Date(addSugarDate);
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // 月份从0开始，需要加1
        const day = date.getDate();
        const targetDateString = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        const tt = new Date(addSugarTime);
        // console.log(addSugarTime);
        const hour = tt.getHours();
        const minute = tt.getMinutes();
        const targetTimeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const time = `${targetDateString} ` + `${addSugarTime}`;
        // console.log(time);
        bloodService.addBloodSugar(url, {user_id: 1, blood_sugar: Number(addSugarValue), date: time}, callback).then();
      }
    }

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item lg={6} xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <BloodPressureChartCard
                weekData={weekPressureData}
                monthData={monthPressureData}
                startTime={startDatePressure}
                setStartTime={(date) => setStartDatePressure(date)}
                endTime={endDatePressure}
                setEndTime={(date) => setEndDatePressure(date)}
                monthStartTime={startDatePressureMonth}
                setMonthStartTime={(date) => setStartDatePressureMonth(date)}
                updateMonthData={updatePressureData}
                updateWeekData={updatePressureData}
            />
          </Grid>
          <Grid item xs={12}>
            <PressureAddCard date={addPressureDate} setDate={(date) => setAddPressureDate(date)}
                                systolic={addPressureSystolic} setSystolic={(value) => setAddPressureSystolic(value)}
                                diastolic={addPressureDiastolic} setDiastolic={(value) => setAddPressureDiastolic(value)}
                                addPressure={addPressure}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={6} xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <BloodSugarChartCard
                weekData={weekSugarData}
                monthData={monthSugarData}
                startTime={startDateSugar}
                setStartTime={(date) => setStartDateSugar(date)}
                endTime={endDateSugar}
                setEndTime={(date) => setEndDateSugar(date)}
                monthStartTime={startDateSugarMonth}
                setMonthStartTime={(date) => setStartDateSugarMonth(date)}
                updateMonthData={updateSugarDate}
                updateWeekData={updateSugarDate}
            />
          </Grid>
          <Grid item xs={12}>
            <SugarAddCard date={addSugarDate} setDate={(date) => setAddSugarDate(date)}
                                time={addSugarTime} setTime={(value) => setAddSugarTime(value)}
                                value={addSugarValue} setValue={(value) => setAddSugarValue(value)}
                                addSugar={addSugar}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DataBlood;
