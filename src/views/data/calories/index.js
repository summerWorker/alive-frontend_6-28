import SmallChartCard from './smallChartCard';
import ChartType from './chart-data/chartType';
import DetailedCard from './detailedCard';
import { Grid, Card, Typography } from '@mui/material';
import { Statistic } from 'antd';
import CountUp from 'react-countup';
// import '../App.css';
const DataCalories = () => {
  const data1 = [2330, 2440, 2500, 2849, 3060, 2870, 1991];
  const data2 = [2100, 1005, 1800, 3322, 560, 1270, 3491];
  const categries = [1, 2, 3, 4, 5, 6, 7];
  const data3 = data1.map((value, index) => value - data2[index]);
  const distribute = [65, 15, 20];
  const labels = ['碳水化合物', '蛋白质', '脂肪'];

  const formatter = (value) => <CountUp end={value} separator="," />;
  const average_data3 = data3.reduce((a, b) => a + b, 0) / data3.length;

  const options = {
    chart: {
      id: 'calorie-detail',
      stacked: true,
      toolbar: {
        show: true
      },
      zoom: {
        enabled: true
      },
      type: 'area',
      width: 800,
      sparkline: {
        enabled: false // false:显示详细的坐标数据，true:只显示一条折线
      }
    },
    dataLabels: {
      enabled: false,
      background: {
        enabled: false,
        margin: 2
      }
    },
    stroke: {
      curve: 'smooth',
      width: 1.5
    },
    tooltip: {
      theme: 'light',
      fixed: {
        enabled: false
      },
      x: {
        show: true
      },
      y1: {
        title: '摄入量'
      },
      y2: {
        title: '消耗量'
      },
      y3: {
        title: '净摄入量'
      },
      marker: {
        show: true
      }
    },
    series: [
      {
        name: '摄入量',
        data: data1
      },
      {
        name: '消耗量',
        data: data2
      },
      {
        name: '净摄入量',
        data: data3
      }
    ],
    xaxis: {
      categories: categries
    }
  };
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} md={8} style={{ width: '60%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
          <DetailedCard options={options} title={'一周卡路里净摄入量'} subtitle={'吃嘛嘛香'} />
        </div>
      </Grid>

      <Grid item xs={12} md={4} style={{ width: '40%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Grid item className={'grid-center'}>
          <Typography variant="body1" style={{ color: 'black' }}>
            本周平均卡路里摄入量
          </Typography>
        </Grid>
        <Grid item className={'grid-center'}>
          <Statistic
            title=""
            value={average_data3}
            precision={2}
            formatter={formatter}
            style={{ marginBottom: '20px', fontSize: '20px' }}
          />
        </Grid>
        <Card style={{ width: '85%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Grid container direction={'column'}>
            <Grid item xs={12} sx={{ pt: '16px !important' }}>
              <SmallChartCard chartType={ChartType.PIE} data={distribute} categries={labels} title={'饮食分布'} customize_date={'本周'} />
            </Grid>
            <Grid item xs={12} sx={{ pt: '16px !important' }}>
              <Grid container>
                <Grid item className={'grid-center'}>
                  <Typography variant="h4">健康建议</Typography>
                </Grid>
                <Grid item className={'grid-center'}>
                  <Typography variant="body1">1. 这是GPT的工作</Typography>
                </Grid>
                <Grid item className={'grid-center'}>
                  <Typography variant="body1">2. 这是GPT的工作</Typography>
                </Grid>

                <Grid item className={'grid-center'} style={{ marginTop: '20px' }}>
                  <Typography variant="h4">推荐食谱</Typography>
                </Grid>
                <Grid item className={'grid-center'}>
                  <Typography variant="body1">1. 这是GPT的工作</Typography>
                </Grid>
                <Grid item className={'grid-center'} style={{ marginBottom: '30px' }}>
                  <Typography variant="body1">2. 这是GPT的工作</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};
export default DataCalories;
