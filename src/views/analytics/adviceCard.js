import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { CardContent, Divider, Grid, Menu, MenuItem, Typography } from '@mui/material';

// project imports
// import BajajAreaChartCard from './BajajAreaChartCard';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// assets
// import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
// import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
// import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const AdviceCard = ({ isLoading }) => {
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
                <Grid container alignContent="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h2">建议</Typography>
                  </Grid>
                  <Grid item>
                    <MoreHorizOutlinedIcon
                      fontSize="small"
                      sx={{
                        color: theme.palette.primary[200],
                        cursor: 'pointer'
                      }}
                      aria-controls="menu-popular-card"
                      aria-haspopup="true"
                      onClick={handleClick}
                    />
                    <Menu
                      id="menu-popular-card"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      variant="selectedMenu"
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                    >
                      <MenuItem onClick={handleClose}> 下载建议报告</MenuItem>
                    </Menu>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ pt: '16px !important' }}>
                <Grid container direction="column">
                  <Grid item>
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item>
                        <Typography variant="h4" fontWeight="300" color="inherit">
                          💡均衡饮食
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item style={{marginTop: "5%"}}>
                        <Typography variant="subtitle2" fontWeight="400" color="inherit">
                          保持均衡的饮食对维持身体健康非常重要。确保每天摄入五种不同颜色的水果和蔬菜，选择高纤维食物（如全谷类、豆类和坚果），限制饱和脂肪和高糖食品的摄入
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 1.5 }} />
                </Grid>
                <Grid container direction="column">
                  <Grid item>
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item>
                        <Typography variant="h4" fontWeight="300" color="inherit">
                          💡规律作息
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item style={{marginTop: "5%"}}>
                        <Typography variant="subtitle2" fontWeight="400" color="inherit">
                          确保每天有足够的睡眠时间，成年人通常需要7到9小时的睡眠。保持规律的作息时间有助于调节身体的生物钟，促进身心健康
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 1.5 }} />
                </Grid>
                <Grid container direction="column">
                  <Grid item>
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item>
                        <Typography variant="h4" fontWeight="300" color="inherit">
                          💡规律运动
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item style={{marginTop: "5%"}}>
                        <Typography variant="subtitle2" fontWeight="400" color="inherit">
                          每周进行至少150分钟的中等强度有氧运动，如快步行走、跑步、游泳或骑自行车。同时，进行肌肉强化活动，如举重或瑜伽，以增强肌肉和骨骼
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 1.5 }} />
                </Grid>
                <Grid container direction="column">
                  <Grid item>
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item>
                        <Typography variant="h4" fontWeight="300" color="inherit">
                          💡定期体检
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item style={{marginTop: "5%"}}>
                        <Typography variant="subtitle2" fontWeight="400" color="inherit">
                          定期进行身体检查是预防疾病和早期发现问题的关键。与医生建立良好的合作关系，并遵循他们的建议进行必要的筛查和检查
                        </Typography>
                      </Grid>
                    </Grid>
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

AdviceCard.propTypes = {
  isLoading: PropTypes.bool
};

export default AdviceCard;
