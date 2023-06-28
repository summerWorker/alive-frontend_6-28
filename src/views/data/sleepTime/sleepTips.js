import { Box, Grid } from '@mui/material';
import { SleepTimeBarChart } from './sleepTimeBarChart';
import { styled } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: '#348888',
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 50,
    height: 50,
    background: '#FFEC5C',
    clipPath: 'polygon(50% 0, 65% 35%, 100% 50%, 65% 65%, 50% 100%, 35% 65%, 0 50%, 35% 35%)',
    top: 15,
    right: 50,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140
    }
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 30,
    height: 30,
    background: '#FFEC5C',
    clipPath: 'polygon(50% 0, 65% 35%, 100% 50%, 65% 65%, 50% 100%, 35% 65%, 0 50%, 35% 35%)',
    top: 35,
    right: 20,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140
    }
  }
}));

export function SleepTips() {
  return (
    <>
      <CardWrapper border={false} content={false}>
        <Box sx={{ p: 2.25 }}>
          <Grid container>
            <Grid item xs={12}>
              <h1>睡眠质量</h1>
            </Grid>
          </Grid>
          <hr style={{ border: 'none', borderTop: '1px solid #CACACA', margin: '20px 0' }} />
          <Grid container>
            <Grid item xs={12} style={{ display: 'flex' }}>
              <h1>84</h1>
              <h4>分</h4>
            </Grid>
            <Grid item xs={12}>
              <h3>睡眠期间清醒了35分钟，有些多，改善睡眠环境可以让你睡得更踏实</h3>
              <h4 style={{ color: 'ghostwhite' }}>
                保持尽可能安静、黑暗的环境，以及适宜的温度和湿度。睡前少用电子产品，因为电子产品发出的蓝光会影响睡眠。
              </h4>
            </Grid>
          </Grid>
          <hr style={{ border: 'none', borderTop: '1px solid #CACACA', margin: '15px 0 ' }} />
          <Grid container>
            <Grid item xs={12}>
              <SleepTimeBarChart></SleepTimeBarChart>
            </Grid>
          </Grid>
        </Box>
      </CardWrapper>
    </>
  );
}
