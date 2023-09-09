import { useEffect, useState } from 'react';
import MainCard from '../../../ui-component/cards/MainCard';
import { Box, List, ListItem, ListItemText, Typography, Button } from '@mui/material';
import { DatePicker, Input, InputNumber } from 'antd';
import dayjs from 'dayjs';
import { addStepData } from '../../../service/dataService/stepsService';

const infoFormat = 'YYYY-MM-DD';

const StepAddCard = () => {
  const [stepDate, setStepDate] = useState(dayjs().format(infoFormat));
  const [step, setStep] = useState();

  useEffect(() => {
    setStepDate(dayjs().format(infoFormat));
  }, []);

  const addStep = () => {
    console.log(stepDate, typeof stepDate);
    if (step === undefined || step === null || step === '') {
      alert('Please input your step!');
    } else {
      addStepData(step, stepDate).then((res) => {
        if (res.status === 1) {
          alert('步数添加成功!');
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
              primary={<Typography variant="h4">添加步数数据</Typography>}
            />
          </ListItem>
          <ListItem alignItems="center" sx={{ py: 0 }} style={{ marginTop: '3%' }}>
            <DatePicker value={dayjs(stepDate)} onChange={(date) => setStepDate(date.format(infoFormat))} />
            <InputNumber
              style={{ width: '40%', marginLeft: '5%', marginRight: '5%' }}
              value={step}
              onChange={(value) => {
                setStep(value);
              }}
            />
            <Button
              variant="outlined"
              style={{ height: '4ch', borderColor: '#ffe57f', borderRadius: '5px', color: '#ffc107' }}
              onClick={() => addStep()}
            >
              确认
            </Button>
          </ListItem>
        </List>
      </Box>
    </MainCard>
  );
};

export default StepAddCard;
