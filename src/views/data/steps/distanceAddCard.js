import { useEffect, useState } from 'react';
import MainCard from '../../../ui-component/cards/MainCard';
import { Box, List, ListItem, ListItemText, Typography, Button } from '@mui/material';
import { DatePicker, Input, InputNumber } from 'antd';
import dayjs from 'dayjs';
import { addStepDistanceData } from '../../../service/dataService/stepsService';

const infoFormat = 'YYYY-MM-DD';

const DistanceAddCard = () => {
  const [distanceDate, setDistanceDate] = useState(dayjs().format(infoFormat));
  const [distance, setDistance] = useState();

  useEffect(() => {
    setDistanceDate(dayjs().format(infoFormat));
  }, []);

  const addDistance = () => {
    if (distance === undefined || distance === null || distance === '') {
      alert('请输入公里数!');
      return;
    }
    if (distance < 0 || isNaN(Number(distance)) || distance === Infinity || distance === -Infinity) {
      alert('公里数不符合规范!');
      return;
    }
    // 获取当前日期和时间
    const currentDate = new Date();

    // 将用户输入的日期和时间转换为 Date 对象
    const userDate = new Date(distanceDate);

    // 检查日期是否为未来日期
    if (userDate > currentDate) {
      alert('日期不能是未来日期');
      return;
    }
    addStepDistanceData(distance, distanceDate).then((res) => {
      if (res.status === 1) {
        alert('公里数添加成功!');
        //刷新页面
        window.location.reload();
      } else {
        alert(res.msg);
      }
    });
  };

  return (
    <MainCard border={false} content={false}>
      <Box sx={{ p: 2 }}>
        <List sx={{ py: 0 }}>
          <ListItem alignItems="center" sx={{ py: 0 }} style={{ marginLeft: '3%' }}>
            <ListItemText
              sx={{
                py: 0,
                mt: 0.45,
                mb: 0.45
              }}
              primary={<Typography variant="h4">添加公里数据</Typography>}
            />
          </ListItem>
          <ListItem alignItems="center" sx={{ py: 0 }} style={{ marginTop: '3%' }}>
            <DatePicker value={dayjs(distanceDate)} onChange={(date) => setDistanceDate(date.format(infoFormat))} />
            <InputNumber
              style={{ width: '40%', marginLeft: '5%', marginRight: '5%' }}
              value={distance}
              onChange={(value) => {
                setDistance(value);
              }}
            />
            <Button
              variant="outlined"
              style={{ height: '4ch', borderColor: '#ffe57f', borderRadius: '5px', color: '#ffc107' }}
              onClick={() => addDistance()}
            >
              确认
            </Button>
          </ListItem>
        </List>
      </Box>
    </MainCard>
  );
};

export default DistanceAddCard;
