/**
 * 静止心率卡片
 */

import PropTypes from 'prop-types';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Link, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// assets
import { Favorite } from '@mui/icons-material';
import SkeletonTotalOrderCard from '../../../ui-component/cards/Skeleton/EarningCard';
import { useEffect, useState } from 'react';
import { getHeartRateData } from '../../../service/dataService/heartRateService';
import dayjs from 'dayjs';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: '#2EE89F',
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: '#A5FAC7',
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
    background: '#A5FAC7',
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

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const heartRateCard = ({ isLoading }) => {
  const theme = useTheme();
  const [heartRate, setHeartRate] = useState(-1);
  const [heartRateMin, setHeartRateMin] = useState(-1);
  const [heartRateMax, setHeartRateMax] = useState(-1);
  useEffect(() => {
    getHeartRateData(dayjs().format('YYYY-MM-DD'), dayjs().add(1, 'day').format('YYYY-MM-DD')).then((res) => {
      console.log(res);
      const data = res.data.heartRates;
      const max = Math.max(...data.map((item) => item.detailValue));
      const min = Math.min(...data.map((item) => item.detailValue));
      const sum = data.reduce((acc, item) => acc + parseFloat(item.detailValue), 0);
      const average = Math.round(sum / data.length);
      setHeartRate(average);
      setHeartRateMax(max);
      setHeartRateMin(min);
    });
  }, []);
  return (
    <>
      {isLoading ? (
        <SkeletonTotalOrderCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Grid container direction="column">
                      <Grid item>
                        <Avatar
                          variant="rounded"
                          sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.largeAvatar,
                            backgroundColor: theme.palette.primary[800],
                            color: '#fff',
                            mt: 1
                          }}
                        >
                          <Favorite />
                        </Avatar>
                      </Grid>
                      <Grid item>
                        <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                          {isNaN(heartRate) || heartRate === 0 ? '暂无数据' : heartRate + '/min'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Typography
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: '#fff'
                  }}
                >
                  今日心率
                </Typography>
              </Grid>
              <Grid item>
                <Grid container justifyContent={'space-between'}>
                  <Grid item>
                    <Typography
                      sx={{
                        fontSize: '1rem',
                        fontWeight: 500,
                        color: '#fff'
                      }}
                    >
                      {'最低心率：' + (isNaN(heartRate) ? '暂无数据' : heartRateMin + '/min')}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      sx={{
                        fontSize: '1rem',
                        fontWeight: 500,
                        color: '#fff'
                      }}
                    >
                      {'最高心率：' + (isNaN(heartRate) ? '暂无数据' : heartRateMax + '/min')}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

heartRateCard.propTypes = {
  isLoading: PropTypes.bool
};

export default heartRateCard;
