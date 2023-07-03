/**
 * 身高卡片
 */

import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Link, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// assets
import EarningIcon from 'assets/images/icons/earning.svg';
import { ManOutlined } from '@mui/icons-material';
import SkeletonTotalOrderCard from '../../../ui-component/cards/Skeleton/EarningCard';
import Chart from 'react-apexcharts';
import ChartDataMonth from './chart-data/total-order-month-line-chart';
const height = 173;

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: '#7B4DDC',
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
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
    background: theme.palette.secondary[800],
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

const HeightCard = ({ isLoading }) => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
                          <ManOutlined />
                        </Avatar>
                      </Grid>
                      <Grid item>
                        <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>{height + 'cm'}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <ChartContainer>
                      <Chart {...ChartDataMonth} />
                    </ChartContainer>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ mb: 1.25 }}>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Typography
                      sx={{
                        fontSize: '1rem',
                        fontWeight: 500,
                        color: '#fff'
                      }}
                    >
                      身高
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Link href="/data/height" color={'#fff'}>
                      详细数据>>
                    </Link>
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

HeightCard.propTypes = {
  isLoading: PropTypes.bool
};

export default HeightCard;
