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
    const data = { start_date: startDatePressure, end_date: endDatePressure };
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
    const data = { start_date: startDatePressureMonth, end_date: endDatePressure };
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
    const data = { start_date: startDateSugar, end_date: endDateSugar };
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
    const data = { start_date: startDateSugarMonth, end_date: endDateSugar };
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
    const data = { start_date: start, end_date: endDatePressure };
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
    const data = { start_date: start, end_date: endDateSugar };
    bloodService.getBloodSugar(url, data, sugar_callback).then();
  }

  const [addPressureDate, setAddPressureDate] = useState(dayjs().format(infoFormat));
    const [addPressureSystolic, setAddPressureSystolic] = useState();
    const [addPressureDiastolic, setAddPressureDiastolic] = useState();

    function addPressure(){
      if(addPressureSystolic === undefined || addPressureSystolic === null || addPressureDiastolic === undefined || addPressureDiastolic === null || addPressureDate === undefined){
        alert("请输入数据");
        return;
      }
      // 获取当前日期和时间
      const currentDate = new Date();

      // 将用户输入的日期和时间转换为 Date 对象
      const userDate = new Date(addPressureDate);

      // 检查日期是否为未来日期
      if (userDate > currentDate) {
        alert("日期不能是未来日期");
        return;
      }
        function callback(data){
          if(data.status >= 0){
            alert("添加成功");
            setAddPressureDiastolic(null);
            setAddPressureSystolic(null);
            setWeekPressureData([...weekPressureData, data.data]);
            setMonthPressureData([...monthPressureData, data.data])
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
        const data = {date: targetDateString, systolic: Number(addPressureSystolic), diastolic: Number(addPressureDiastolic)};
        bloodService.addBloodPressure(url, data, callback).then();

    }

    const [addSugarDate, setAddSugarDate] = useState(dayjs().format(infoFormat));
    const [addSugarTime, setAddSugarTime] = useState(dayjs().format(timeFormat));
    const [addSugarValue, setAddSugarValue] = useState();

    function addSugar(){
      if(addSugarValue === undefined || addSugarValue === null || addSugarDate === undefined || addSugarTime === undefined) {
        alert("请输入数据");
        return;
      }
      // 获取当前日期和时间
      const currentDate = new Date();

// 将用户输入的日期和时间转换为 Date 对象
      const userDate = new Date(addSugarDate);
      const userTime = new Date(`1970-01-01T${addSugarTime}:00`);

// 检查日期是否为未来日期
      if (userDate > currentDate) {
        alert("日期不能是未来日期");
        return;
      }
        // 检查时间是否为未来时间
        if (userDate.getTime() === currentDate.getTime() && userTime > currentDate) {
          alert("时间不能是未来时间");
          return;
        }

        function callback(data){
          if(data.status >= 0){
            alert("添加成功!");
            setAddSugarValue(null);
            setWeekSugarData([...weekSugarData, data.data]);
            setMonthSugarData([...monthSugarData, data.data])
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
        const timeParts = addSugarTime.split(':');
        const hour = timeParts[0].toString().padStart(2, '0');
        const minute = timeParts[1].toString().padStart(2, '0');
        const time = `${targetDateString} ${hour}:${minute}`;
        console.log(time);
        bloodService.addBloodSugar(url, {blood_sugar: Number(addSugarValue), date: time}, callback).then();

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
