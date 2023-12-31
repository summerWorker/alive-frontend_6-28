import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { CardContent, Grid, Menu, MenuItem, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';

// project imports
import chartData from './chart-data/bajaj-area-chart';
import { gridSpacing } from 'store/constant';
import MainCard from '../../ui-component/cards/MainCard';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
// import SleepChartCard from './SleepChartCard';
import StepChart from './StepChart';

// ===========================|| DASHBOARD DEFAULT - BAJAJ AREA CHART CARD ||=========================== //

const StepChartCard = (props) => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const { navType } = customization;

  const orangeDark = theme.palette.secondary[800];

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const newSupportChart = {
      ...chartData.options,
      colors: [orangeDark],
      tooltip: {
        theme: 'light'
      }
    };
    ApexCharts.exec(`support-chart`, 'updateOptions', newSupportChart);
  }, [navType, orangeDark]);

  let weekData = Array(7).fill(null);
  let tmp_data = props.data;
  for(let i = 0; i < tmp_data.length; ++i){
    const cur_date = new Date(tmp_data[i].date);
    const today = new Date();
    // console.log(cur_date.getDay(), today.getDay());
    const day_of_week = 6 + cur_date.getDay() - today.getDay();
    const cur_step = tmp_data[i].step;
    weekData[day_of_week] = cur_step;
  }

  return (
    <MainCard content={false}>
      <CardContent>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Grid container alignContent="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h4">运动步数</Typography>
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
                  <MenuItem onClick={handleClose}> 本日</MenuItem>
                  <MenuItem onClick={handleClose}> 本月</MenuItem>
                </Menu>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ pt: '16px !important' }}>
            <StepChart data={weekData} />
          </Grid>
        </Grid>
      </CardContent>
    </MainCard>
  );
};

export default StepChartCard;
