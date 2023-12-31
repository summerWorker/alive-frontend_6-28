import { useEffect, useState } from 'react';
import MainCard from '../../../ui-component/cards/MainCard';
import { Box, List, ListItem, ListItemText, Typography, Button } from '@mui/material';
import { DatePicker, Input, InputNumber } from 'antd';
import dayjs from 'dayjs';
import { addStepGoalData } from '../../../service/dataService/stepsService';

const infoFormat = 'YYYY-MM-DD';

const GoalAddCard = () => {
  const [goalDate, setGoalDate] = useState(dayjs().format(infoFormat));
  const [goal, setGoal] = useState();

  useEffect(() => {
    setGoalDate(dayjs().format(infoFormat));
  }, []);

  const addGoal = () => {
    if (goal === undefined || goal === null || goal === '') {
      alert('请输入目标!');
      return;
    }
    if (goal < 0 || isNaN(Number(goal)) || goal === Infinity || goal === -Infinity) {
      alert('目标不符合规范!');
      return;
    }
    // 获取当前日期和时间
    const currentDate = new Date();

    // 将用户输入的日期和时间转换为 Date 对象
    const userDate = new Date(goalDate);

    // 检查日期是否为未来日期
    if (userDate > currentDate) {
      alert('日期不能是未来日期');
      return;
    }

    addStepGoalData(goal, goalDate).then((res) => {
      if (res.status > 0) {
        alert('目标添加成功!');
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
              primary={<Typography variant="h4">添加目标数据</Typography>}
            />
          </ListItem>
          <ListItem alignItems="center" sx={{ py: 0 }} style={{ marginTop: '3%' }}>
            <DatePicker value={dayjs(goalDate)} onChange={(date) => setGoalDate(date.format(infoFormat))} />
            <InputNumber style={{ width: '40%', marginLeft: '5%', marginRight: '5%' }} value={goal} onChange={(value) => setGoal(value)} />
            <Button
              variant="outlined"
              style={{ height: '4ch', borderColor: '#ffe57f', borderRadius: '5px', color: '#ffc107' }}
              onClick={() => addGoal()}
            >
              确认
            </Button>
          </ListItem>
        </List>
      </Box>
    </MainCard>
  );
};

export default GoalAddCard;
