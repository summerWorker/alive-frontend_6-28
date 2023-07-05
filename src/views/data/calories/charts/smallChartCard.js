// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, Grid, Typography } from '@mui/material';

// project imports
import LineChart from './lineChart';
import ChartType from '../chart-data/chartType';
import HeatMap from './heatMap';
import PieChart from './pieChart';

// ===========================|| DASHBOARD DEFAULT - BAJAJ AREA CHART CARD ||=========================== //
/*
 * @Brief: 折线图
 * @Param: data:数据 categries:横坐标
 * @example:  const data =  [30, 40, 35, 50, 49, 60, 70, 91, 125];
 *            const categries = [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998];
 *            <LineChart data={data} categries={categries}/>
 * */
const SmallChartCard = ({ data, categries, title, subtitle, chartType, customize_date }) => {
  const theme = useTheme();
  const today = new Date();
  const date = customize_date === undefined ? today.getMonth() + 1 + '月' + today.getDate() + '日' : customize_date;

  return (
    <Card style={{ background: 'transparent' }}>
      <Grid container sx={{ p: 2, pb: 0, color: '#fff' }}>
        <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="subtitle1" sx={{ color: theme.palette.grey[800] }}>
                {date}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h4" sx={{ color: theme.palette.grey[800] }}>
                {title}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ color: theme.palette.grey[800] }}>
            {subtitle}
          </Typography>
        </Grid>
      </Grid>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {chartType === ChartType.HEAT && <HeatMap data={data} categries={categries} />}
        {chartType === ChartType.LINE && <LineChart data={data} categries={categries} />}
        {chartType === ChartType.PIE && <PieChart data={data} categries={categries} />}
        {chartType === undefined && <LineChart data={data} categries={categries} />}
      </div>
    </Card>
  );
};

export default SmallChartCard;
