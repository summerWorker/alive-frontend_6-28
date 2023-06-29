// material-ui
import { Button, CardContent, Grid, Typography } from '@mui/material';

import Chart from 'react-apexcharts';
import getWeekChartData from './chart-data/weight-week-chart';
import getMonthChartData from './chart-data/weight-month-chart';
import getYearChartData from './chart-data/weight-year-chart';


// project imports
import MainCard from '../../../ui-component/cards/MainCard';
import { gridSpacing } from '../../../store/constant';
import { useState } from 'react';

const TotalWeightLineChart = (props) => {
  // week month year data
  // week: 0, month: 1, year: 2
  const [timeValue, setTimeValue] = useState(0);
  const handleChangeTime = (event, newValue) => {
    setTimeValue(newValue);
  };

  return (
    <MainCard content={false}>
      <CardContent>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    <Typography variant="subtitle2">当前体重</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h3">{props.currentW}KG</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    <Typography variant="subtitle2">目标体重</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h3">{props.goal}KG</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Button
                  disableElevation
                  variant={(timeValue === 0) ? 'contained' : 'text'}
                  size="small"
                  sx={{ color: 'success[200]' }}
                  onClick={(e) => handleChangeTime(e, 0)}
                >
                  周
                </Button>
                <Button
                  disableElevation
                  variant={(timeValue === 1) ? 'contained' : 'text'}
                  size="small"
                  sx={{ color: 'success[200]' }}
                  onClick={(e) => handleChangeTime(e, 1)}
                >
                  月
                </Button>
                <Button
                    disableElevation
                    variant={(timeValue === 2) ? 'contained' : 'text'}
                    size="small"
                    sx={{ color: 'success[200]' }}
                    onClick={(e) => handleChangeTime(e, 2)}
                >
                  年
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ pt: '16px !important' }} style={{marginRight: "2.5%"}}>
            {timeValue === 0 ? <Chart {...getWeekChartData(props.weekWeight, props.goal)} /> :
                (timeValue === 1 ? <Chart {...getMonthChartData(props.monthWeight, props.goal)} /> :
                    <Chart {...getYearChartData(props.yearWeight, props.goal)} />)}
          </Grid>
        </Grid>
      </CardContent>
    </MainCard>
  );
};

export default TotalWeightLineChart;
