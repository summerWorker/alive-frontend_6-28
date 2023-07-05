// material-ui
import { Card, Grid } from '@mui/material';

// project imports
import Chart from 'react-apexcharts';
import { getDetailChartData } from './chart-data/calories-chart';

// ===========================|| DASHBOARD DEFAULT - BAJAJ AREA CHART CARD ||=========================== //
/*
 * @Brief: 折线图
 * @Param: options:表格定义 title:标题 subtitle:副标题
 * @example:
 * */
const DetailedCard = ({ intakeData, consumptionData }) => {
  return (
    <div style={{ background: '#ffffff', padding: '20px', borderRadius: '10px' }}>
      <Grid container direction={'column'} spacing={3}>
        <Grid item alignSelf={'center'}>
          <h1>饮食摄入与消耗</h1>
        </Grid>

        <Grid item>
          <Chart {...getDetailChartData(intakeData, consumptionData)} />
        </Grid>
      </Grid>
    </div>
  );
};

export default DetailedCard;
