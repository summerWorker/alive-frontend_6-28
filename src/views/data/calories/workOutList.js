import { Card, DatePicker, List, Image } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { WorkOutCard } from './workOutCard';
import { getWorkOutService } from '../../../service/dataService/workOutService';

const infoFormat = 'YYYY-MM-DD';

export const WorkOutList = () => {
  const [time, setTime] = useState(dayjs().format(infoFormat));
  const [workOutList, setWorkOutList] = useState([]);

  useEffect(() => {
    setTime(dayjs().format(infoFormat));
  }, []);

  useEffect(() => {
    //清空列表
    setWorkOutList([]);
    getWorkOutService(time, time).then((res) => {
      if (res && res.status === 1) {
        setWorkOutList(res.data.workout_list);
      }
    });
  }, [time]);

  const handleTimeChange = (value) => {
    setTime(value.format(infoFormat));
  };

  return (
    <>
      <DatePicker value={dayjs(time)} onChange={(value) => handleTimeChange(value)}></DatePicker>
      <WorkOutCard title={'运动情况'} dataSource={workOutList}></WorkOutCard>
    </>
  );
};
