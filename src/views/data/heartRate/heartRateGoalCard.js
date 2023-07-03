import { Button, Grid, TextField, Typography } from '@mui/material';
import MainCard from '../../../ui-component/cards/MainCard';
import InputAdornment from '@mui/material/InputAdornment';

const HeartRateGoalCard = () => {
  return (
    <MainCard>
      <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>设置您的目标</Typography>
      <Grid container alignItems={'center'}>
        <Grid item xs={10}>
          <TextField
            label="设置您的目标"
            id="outlined-start-adornment"
            sx={{ m: 1, width: '65%' }}
            InputProps={{
              endAdornment: <InputAdornment position="end">/min</InputAdornment>
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <Button variant={'outlined'} style={{ height: '6ch', borderColor: '#ffe57f', borderRadius: '10px', color: '#ffc107' }}>
            确认
          </Button>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default HeartRateGoalCard;
