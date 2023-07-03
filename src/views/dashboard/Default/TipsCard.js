import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Button, CardActions, CardContent, Divider, Grid, Menu, MenuItem, SvgIcon, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { gridSpacing } from 'store/constant';
import TipsIcon from './TipsIcon';

// assets
// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //
const TipsCard = ({ isLoading }) => {
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
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          <CardContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid container alignItems="center">
                  <Grid item>
                    <Typography variant="h4">健康小贴士</Typography>
                  </Grid>
                  <Grid item>
                    <LightbulbIcon
                      fontSize="medium"
                      sx={{
                        color: theme.palette.warning.main,
                        cursor: 'pointer',
                        marginLeft: '0.5rem'
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container justifyContent={'space-between'}>
                  <Grid item xs={6}>
                    <Grid container direction={'column'}>
                      <Divider sx={{ my: 1.5 }} />
                      <Grid item>
                        <Typography variant="subtitle1" color="inherit">
                          1.我爱洗澡，皮肤好好
                        </Typography>
                      </Grid>
                      <Divider sx={{ my: 1.5 }} />
                      <Grid item>
                        <Typography variant="subtitle1" color="inherit">
                          2.多读书，多看报，少吃零食多睡觉
                        </Typography>
                      </Grid>
                      <Divider sx={{ my: 1.5 }} />
                      <Grid item>
                        <Typography variant="subtitle1" color="inherit">
                          3.不吃蔬菜，小孩坏坏，妈妈不爱
                        </Typography>
                      </Grid>
                      <Divider sx={{ my: 1.5 }} />
                      <Grid item>
                        <Typography variant="subtitle1" color="inherit">
                          4.饭后百步走，能活九十九
                        </Typography>
                      </Grid>
                      <Divider sx={{ my: 1.5 }} />
                      <Grid item>
                        <Typography variant="subtitle1" color="inherit">
                          5.远离上海交通大学软件学院
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <TipsIcon />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </MainCard>
      )}
    </>
  );
};

TipsCard.propTypes = {
  isLoading: PropTypes.bool
};

export default TipsCard;
