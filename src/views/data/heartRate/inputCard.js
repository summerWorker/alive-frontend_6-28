import { Button, Grid, TextField, Typography } from '@mui/material';
import MainCard from '../../../ui-component/cards/MainCard';
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from 'react';
import { addHeartRateData } from '../../../service/dataService/heartRateService';
import dayjs from 'dayjs';

const InputCard = () => {
  const [heartRate, setHeartRate] = useState('');

  const handleClick = () => {
    console.log(addHeartRateData(dayjs().valueOf(), heartRate));
    window.location.reload();
  };

  return (
    <MainCard>
      <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>手动录入数据</Typography>
      <Grid container alignItems={'center'}>
        <Grid item xs={10}>
          <TextField
            label="静止心率"
            id="outlined-start-adornment"
            sx={{ m: 1, width: '65%' }}
            InputProps={{
              endAdornment: <InputAdornment position="end">/min</InputAdornment>
            }}
            value={heartRate}
            onChange={(e) => setHeartRate(e.target.value)}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            variant={'outlined'}
            style={{ height: '6ch', borderColor: '#ffe57f', borderRadius: '10px', color: '#ffc107' }}
            onClick={handleClick}
          >
            确认
          </Button>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default InputCard;
