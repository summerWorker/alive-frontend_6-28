import { Box, Grid } from '@mui/material';
import { SleepTimeBarChart } from './sleepTimeBarChart';
import { styled } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import {useEffect, useState} from 'react';
import {getSleepAnalysis, getSleepData} from "../../../service/dataService/sleepService";

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

export const SleepTips = ({startTime, endTime}) => {
  const [tip, setTip] = useState([]);
  useEffect(() => {
    getSleepAnalysis(startTime).then((res) => {
      if (res && res.status === 1) {
        setTip(res.data);
      }
    });
  }, [startTime]);

   if (tip.length === 0) {
    return (
        <>
          <CardWrapper border={false} content={false}>
            <Box sx={{p: 2.25}}>
              <Grid container>
                <Grid item xs={12}>
                  <h1>睡眠质量</h1>
                </Grid>
              </Grid>
              <hr style={{border: 'none', borderTop: '1px solid #CACACA', margin: '20px 0'}}/>
              <Grid container>
                <Grid item xs={12} style={{display: 'flex'}}>
                  <h1>暂无数据</h1>
                </Grid>
                <Grid item xs={12}>
                  <h4 style={{color: 'ghostwhite'}}>
                    保持尽可能安静、黑暗的环境，以及适宜的温度和湿度。睡前少用电子产品，因为电子产品发出的蓝光会影响睡眠。
                  </h4>
                </Grid>
              </Grid>
              <hr style={{border: 'none', borderTop: '1px solid #CACACA', margin: '15px 0 '}}/>
              <Grid container>
                <Grid item xs={12}>
                  <SleepTimeBarChart startTime={startTime} endTime={endTime}></SleepTimeBarChart>
                </Grid>
              </Grid>
            </Box>
          </CardWrapper>
        </>
    );
  } else {
     return (
         <>
           <CardWrapper border={false} content={false}>
             <Box sx={{p: 2.25}}>
               <Grid container>
                 <Grid item xs={12}>
                   <h1>睡眠评分: {tip.score.toFixed(1)}</h1>
                 </Grid>
               </Grid>
               <hr style={{border: 'none', borderTop: '1px solid #CACACA', margin: '20px 0'}}/>
               <Grid container>
                 <Grid item xs={12}>
                   <h3>{tip.bedtime.analysis}</h3>
                   <h4 style={{color: 'ghostwhite'}}>
                     {tip.bedtime.advice}
                   </h4>
                 </Grid>
                 <Grid item xs={12}>
                   <h3>{tip.duration.analysis}</h3>
                   <h4 style={{color: 'ghostwhite'}}>
                     {tip.duration.advice}
                   </h4>
                 </Grid>
                 <Grid item xs={12}>
                   <h3>{tip.quality.analysis}</h3>
                   <h4 style={{color: 'ghostwhite'}}>
                     {tip.quality.advice}
                   </h4>
                 </Grid>
               </Grid>
               <hr style={{border: 'none', borderTop: '1px solid #CACACA', margin: '15px 0 '}}/>
               <Grid container>
                 <Grid item xs={12}>
                   <SleepTimeBarChart startTime={startTime} endTime={endTime}></SleepTimeBarChart>
                 </Grid>
               </Grid>
             </Box>
           </CardWrapper>
         </>
     );
  }
}

