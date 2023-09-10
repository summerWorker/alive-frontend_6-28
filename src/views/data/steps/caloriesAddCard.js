import { useEffect, useState } from 'react';
import MainCard from '../../../ui-component/cards/MainCard';
import { Box, List, ListItem, ListItemText, Typography, Button } from '@mui/material';
import { DatePicker, Input, InputNumber } from 'antd';
import dayjs from 'dayjs';
import { addStepCaloriesData } from '../../../service/dataService/stepsService';

const infoFormat = 'YYYY-MM-DD';

const CaloriesAddCard = () => {
  const [caloriesDate, setCaloriesDate] = useState(dayjs().format(infoFormat));
  const [calories, setCalories] = useState();

  useEffect(() => {
    setCaloriesDate(dayjs().format(infoFormat));
  }, []);

  const addCalories = () => {
    if (calories === undefined || calories === null || calories === '') {
      alert('请输入卡路里!');
    } else if (calories < 0 || isNaN(Number(calories)) || calories === Infinity || calories === -Infinity) {
      alert('卡路里不符合规范!');
    } else {
      addStepCaloriesData(calories, caloriesDate).then((res) => {
        if (res.status === 1) {
          alert('卡路里添加成功！');
          //刷新页面
          window.location.reload();
        } else {
          alert(res.msg);
        }
      });
    }
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
              primary={<Typography variant="h4">添加卡路里数据</Typography>}
            />
          </ListItem>
          <ListItem alignItems="center" sx={{ py: 0 }} style={{ marginTop: '3%' }}>
            <DatePicker value={dayjs(caloriesDate)} onChange={(date) => setCaloriesDate(date.format(infoFormat))} />
            <InputNumber
              style={{ width: '40%', marginLeft: '5%', marginRight: '5%' }}
              value={calories}
              onChange={(value) => {
                setCalories(value);
              }}
            />
            <Button
              variant="outlined"
              style={{ height: '4ch', borderColor: '#ffe57f', borderRadius: '5px', color: '#ffc107' }}
              onClick={() => addCalories()}
            >
              确认
            </Button>
          </ListItem>
        </List>
      </Box>
    </MainCard>
  );
};

export default CaloriesAddCard;
