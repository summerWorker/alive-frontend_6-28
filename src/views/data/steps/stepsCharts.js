import Chart from 'react-apexcharts';
import { monthStepsData } from './chart-data/steps-chart';
import { Statistic } from 'antd';
import { useEffect, useState } from 'react';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import { getDayStepsData } from './chart-data/steps-day-chart';
import { getWeekStepsData } from './chart-data/steps-week-chart';
import { getMonthStepsData } from './chart-data/steps-month-chart';

export function StepsCharts(props) {
  const [selectedIndex, setSelectedIndex] = useState();

  useEffect(() => {
    setSelectedIndex(props.chooseState);
  }, [props.chooseState]);

  const [averageSteps, setAverageSteps] = useState(0);

  useEffect(() => {
    if (props.data && props.data.length !== 0) {
      let allSteps = 0;
      props.data.forEach((item) => {
        allSteps += item.step;
      });
      setAverageSteps((allSteps / props.data.length).toFixed(0));
    }
  }, [props.data, props.chooseState]);

  return (
    <>
      <div style={{ background: '#ffffff', padding: '20px', borderRadius: '10px' }}>
        {selectedIndex === 'day' && <Statistic title="总步数" value={averageSteps} prefix={<DirectionsRunIcon />} />}
        {selectedIndex === 'week' && <Statistic title="日均步数" value={averageSteps} prefix={<DirectionsRunIcon />} />}
        {selectedIndex === 'month' && <Statistic title="日均步数" value={averageSteps} prefix={<DirectionsRunIcon />} />}

        {selectedIndex === 'day' && <Chart {...getDayStepsData(props.data)} />}
        {selectedIndex === 'week' && <Chart {...getWeekStepsData(props.data, props.startTime, props.endTime)} />}
        {selectedIndex === 'month' && <Chart {...getMonthStepsData(props.data, props.startTime, props.endTime)} />}
      </div>
    </>
  );
}
