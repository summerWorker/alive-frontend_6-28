import { Avatar, Box, Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';
import { styled, useTheme } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import { FileAddFilled } from '@ant-design/icons';
import { Button, Form, Input, Modal, TimePicker } from 'antd';
import React, { useState } from 'react';
import dayjs from 'dayjs';

const format = 'HH:mm';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: '#B4CF66',
  color: '#146152',
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: '#44803F',
    borderRadius: '50%',
    top: -85,
    right: -95,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140
    }
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: '#FFEC5C',
    borderRadius: '50%',
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down('sm')]: {
      top: -155,
      right: -70
    }
  }
}));

const ChartContainer = styled('div')({
  position: 'relative',
  zIndex: 1
});

export function SleepGoalCard(props) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <>
      <CardWrapper border={false} content={false}>
        <Box sx={{ p: 2.25 }}>
          <Grid container spacing={gridSpacing} justifyContent={'space-between'}>
            <Grid item>
              <h2 style={{ color: '#164C45' }}>设置定时</h2>
              <h4 style={{ color: '#164C45' }}>今天</h4>
            </Grid>
            <Grid item>
              <ChartContainer>
                <Button onClick={props.updateGoal}>提交</Button>
              </ChartContainer>
            </Grid>
          </Grid>

          <Grid container spacing={gridSpacing}>
            <Grid item xs={6}>
              <h4 style={{ color: '#164C45' }}>就寝</h4>
              {/*<h1 style={{ color: '#164C45' }}>{props.bedTime}</h1>*/}
              <TimePicker
                value={dayjs(props.bedTime, format)}
                onChange={(time) => {
                  props.updateBedTime(dayjs(time).format(format));
                }}
                format={format}
              />
            </Grid>
            <Grid item xs={6}>
              <h4 style={{ color: '#164C45' }}>起床</h4>
              {/*<h1 style={{ color: '#164C45' }}>{props.getUpTime}</h1>*/}
              <TimePicker
                value={dayjs(props.getUpTime, format)}
                format={format}
                onChange={(time) => props.updateGetUpTime(dayjs(time).format(format))}
              />
            </Grid>
          </Grid>
        </Box>
      </CardWrapper>
    </>
  );
}
