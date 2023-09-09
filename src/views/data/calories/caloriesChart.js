import Chart from 'react-apexcharts';
import { useEffect, useState } from 'react';
import { getWeekCaloriesChartData } from './chart-data/calories-week-chart-data';
import { getMonthCaloriesData } from './chart-data/calories-month-chart-data';

export function CaloriesChart(props) {
  const [selectedIndex, setSelectedIndex] = useState();
  const [isWeekDataReady, setIsWeekDataReady] = useState(false);
  const [isMonthDataReady, setIsMonthDataReady] = useState(false);

  useEffect(() => {
    setIsWeekDataReady(false);
    setIsMonthDataReady(false);
  }, []);

  useEffect(() => {
    setSelectedIndex(props.chooseState);
  }, [props.chooseState]);

  // useEffect(() => {
  //   if (props.chooseState === 0) {
  //     if (
  //       props.dietData !== undefined &&
  //       props.dietData.length !== 0 &&
  //       props.dietData !== [] &&
  //       props.workOutData !== undefined &&
  //       props.workOutData.length !== 0 &&
  //       props.workOutData !== []
  //     ) {
  //       setIsWeekDataReady(true);
  //     }
  //   }
  //   if (props.chooseState === 1) {
  //     if (props.dietData !== undefined && props.dietData.length !== 0 && props.dietData !== []) {
  //       setIsMonthDataReady(true);
  //     }
  //   }
  // }, [props.dietData, props.workOutData]);

  return (
    <>
      <div style={{ background: '#ffffff', padding: '20px', borderRadius: '10px' }}>
        {selectedIndex === 'week' && (
          <>
            {/*{!isWeekDataReady && <h3>暂无数据，以下是样例数据</h3>}*/}
            <Chart {...getWeekCaloriesChartData(props.dietData, props.workOutData, props.startTime, props.endTime)} />
          </>
        )}
        {selectedIndex === 'month' && (
          <>
            {/*{(props.data === undefined || props.data.length === 0) && <h3>暂无数据，以下是样例数据</h3>}*/}
            <Chart {...getMonthCaloriesData(props.dietData, props.workOutData, props.startTime, props.endTime)} />
          </>
        )}
      </div>
    </>
  );
}
