import { Progress } from 'antd';
import { styled } from '@mui/material/styles';
import MainCard from '../../../ui-component/cards/MainCard';
import { Box, Grid } from '@mui/material';
import { useState } from 'react';

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

export function StepsGoal() {
  const [stepsGoal, setStepsGoal] = useState(10000);
  const [steps, setSteps] = useState(1212);
  return (
    <>
      <CardWrapper border={false} content={false}>
        <Box sx={{ p: 2.25 }}>
          <Grid container direction={'column'}>
            <Grid item>
              <h1>目标打卡</h1>
            </Grid>
            <Grid item>
              {stepsGoal - steps > 0 ? (
                <>
                  <h4>还差{stepsGoal - steps}步，加油！</h4>
                  <Progress percent={((steps * 100) / stepsGoal).toFixed(2)} style={{ width: '95%' }} />
                </>
              ) : (
                <>
                  <h4>恭喜你完成目标！</h4>
                  <Progress percent={100} status="success" style={{ width: '95%' }} />
                </>
              )}
            </Grid>
          </Grid>
        </Box>
      </CardWrapper>
    </>
  );
}
