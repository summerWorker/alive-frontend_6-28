import { Card, DatePicker, List, Image } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { getDietService } from '../../../service/dataService/dietService';
import { Grid } from '@mui/material';
import { DietCard } from './dietCard';

const infoFormat = 'YYYY-MM-DD';

export const DietList = () => {
  const [time, setTime] = useState(dayjs().format(infoFormat));
  const [breakfastList, setBreakfastList] = useState([]);
  const [lunchList, setLunchList] = useState([]);
  const [dinnerList, setDinnerList] = useState([]);
  const [snackList, setSnackList] = useState([]);

  useEffect(() => {
    setTime(dayjs().format(infoFormat));
  }, []);

  useEffect(() => {
    //清空列表
    setBreakfastList([]);
    setLunchList([]);
    setDinnerList([]);
    getDietService(1, time).then((res) => {
      if (res && res.status === 1) {
        res.data.diet_list.forEach((item) => {
          if (item.type === 'BREAKFAST') setBreakfastList((prevState) => [...prevState, item]);
          if (item.type === 'LUNCH') setLunchList((prevState) => [...prevState, item]);
          if (item.type === 'DINNER') setDinnerList((prevState) => [...prevState, item]);
          if (item.type === 'SNACK') setSnackList((prevState) => [...prevState, item]);
        });
      }
    });
  }, [time]);

  const handleTimeChange = (value) => {
    setTime(value.format(infoFormat));
  };

  return (
    <>
      <DatePicker value={dayjs(time)} onChange={(value) => handleTimeChange(value)}></DatePicker>
      <DietCard title={'早餐'} dataSource={breakfastList}></DietCard>
      <DietCard title={'午餐'} dataSource={lunchList}></DietCard>
      <DietCard title={'晚餐'} dataSource={dinnerList}></DietCard>
      <DietCard title={'加餐'} dataSource={snackList}></DietCard>
    </>
  );
};
