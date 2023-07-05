import Chart from 'react-apexcharts';
import { dayStepsData, monthStepsData, weekStepsData } from './chart-data/steps-chart';
import { DatePicker, Segmented, Statistic } from 'antd';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Grid } from '@mui/material';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

export function StepsCharts(props) {
  const [selectedIndex, setSelectedIndex] = useState();

  useEffect(() => {
    setSelectedIndex(props.chooseState);
  }, [props.chooseState]);

  return (
    <>
      <div style={{ background: '#ffffff', padding: '20px', borderRadius: '10px' }}>
        {selectedIndex === 'day' && <Statistic title="总步数" value={1128} prefix={<DirectionsRunIcon />} />}
        {selectedIndex === 'week' && <Statistic title="日均步数" value={1128} prefix={<DirectionsRunIcon />} />}
        {selectedIndex === 'month' && <Statistic title="日均步数" value={1128} prefix={<DirectionsRunIcon />} />}

        {selectedIndex === 'day' && <Chart {...dayStepsData} />}
        {selectedIndex === 'week' && <Chart {...weekStepsData} />}
        {selectedIndex === 'month' && <Chart {...monthStepsData} />}
      </div>
    </>
  );
}
