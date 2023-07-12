import { Grid } from '@mui/material';
import { Collapse } from 'antd';
import { useEffect, useState } from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import { RunningManImage } from './runningManImage';

export function StepsDetails(porps) {
  console.log('data', porps.data);
  const [distance, setDistance] = useState(189);
  const [calories, setCalories] = useState(1280);
  const [climb, setClimb] = useState(2);
  const [heartRate, setHeartRate] = useState(0);
  const [cadence, setCadence] = useState(50);

  useEffect(() => {
    if (porps.data && porps.data.length === 1) {
      setDistance(porps.data[0].distance);
      setCalories(porps.data[0].calories);
    }
  }, [porps.data]);

  const getItems = (panelStyle) => [
    {
      key: 'distance',
      label: (
        <Grid container justifyContent={'space-between'}>
          <Grid item>{'距离'}</Grid>
          <Grid item>{distance}公里</Grid>
        </Grid>
      ),
      children: <p>{'距离统计你走路和各项运动产生的距离'}</p>,
      style: panelStyle
    },
    {
      key: 'activeCollapse',
      label: (
        <Grid container justifyContent={'space-between'}>
          <Grid item>{'活动消耗'}</Grid>
          <Grid item>{calories}千卡</Grid>
        </Grid>
      ),
      children: (
        <>
          <p>{'活动消耗统计你一天24小时活动产生的总消耗，除了日常走路，还包括跑步、健走、骑行、健身、游泳等运动产生的消耗。'}</p>
          <p>{'建议每天活动消耗300千卡有助于保持健康'}</p>
        </>
      ),
      style: panelStyle
    },
    {
      key: 'climb',
      label: (
        <Grid container justifyContent={'space-between'}>
          <Grid item>{'爬楼'}</Grid>
          <Grid item>{climb}层</Grid>
        </Grid>
      ),
      children: <p>{'爬楼层数根据你爬升的高度换算得出。目前该指标仅支持有气压计的设备。'}</p>,
      style: panelStyle
    },
    {
      key: 'heartRate',
      label: (
        <Grid container justifyContent={'space-between'}>
          <Grid item>{'步行平均心率'}</Grid>
          <Grid item>{heartRate === 0 ? '-- ' : heartRate}次/分钟</Grid>
        </Grid>
      ),
      children: (
        <>
          <p>{'当佩戴穿戴设备时，穿戴设备将智能识别你的日常走路时的平均心率。'}</p>
          <p>{'步行心率的个体差异较大，与走路速度、体重、情绪等因素相关。经常运动，保持标准体重并缓解压力时，步行平均心率会相对较低。'}</p>
        </>
      ),
      style: panelStyle
    },
    {
      key: 'cadence',
      label: (
        <Grid container justifyContent={'space-between'}>
          <Grid item>{'步频'}</Grid>
          <Grid item>{cadence === 0 ? '-- ' : cadence}步/分钟</Grid>
        </Grid>
      ),
      children: (
        <>
          <p>{'步频统计你每分钟脚落地的次数。'}</p>
        </>
      ),
      style: panelStyle
    }
  ];

  const panelStyle = {
    marginBottom: -10,
    borderRadius: 4,
    border: 'none',
    width: '90%'
  };
  return (
    <>
      <div style={{ background: '#ffffff', padding: '20px', borderRadius: '10px' }}>
        <Grid container direction={'column'}>
          <Grid item>
            <h1>步数详情</h1>

            {/*<Grid container>*/}
            {/*  <Grid item lg={4}>*/}
            {/*    <h1>步数详情</h1>*/}
            {/*  </Grid>*/}
            {/*  <Grid item lg={6}>*/}
            {/*    <RunningManImage />*/}
            {/*  </Grid>*/}
            {/*</Grid>*/}
          </Grid>
          <Grid item>
            <Collapse
              accordion
              items={getItems(panelStyle)}
              bordered={false}
              expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
}
