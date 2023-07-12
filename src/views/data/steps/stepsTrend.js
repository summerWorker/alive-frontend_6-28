import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';

export function StepsTrend(props) {
  const [steps, setSteps] = useState(0);
  const [averageSteps, setAverageSteps] = useState(0);
  const [analysis, setAnalysis] = useState('日均步数同比持平');

  useEffect(() => {
    if (props.data && props.data.length > 0) {
      // 计算总步数和日均步数
      let totalSteps = 0;

      props.data.forEach((item) => {
        totalSteps += item.step;
      });

      setSteps(totalSteps);
      setAverageSteps(Math.round(totalSteps / props.data.length));

      // 根据日期排序数据
      const sortedData = props.data.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
      });

      let increaseCount = 0;
      let decreaseCount = 0;

      // 遍历数据计算总步数和上升/下降次数
      for (let i = 1; i < sortedData.length; i++) {
        const currentSteps = sortedData[i].step;
        const previousSteps = sortedData[i - 1].step;

        if (currentSteps - previousSteps > 100) {
          increaseCount++;
        } else if (previousSteps - currentSteps > 100) {
          decreaseCount++;
        }
      }

      // 判断步数趋势
      const trend =
        increaseCount >= sortedData.length / 2
          ? '日均步数上升'
          : decreaseCount >= sortedData.length / 2
          ? '日均步数下降'
          : '日均步数同比持平';

      setAnalysis(trend);
    }
  }, [props.data]);

  return (
    <>
      <div style={{ background: '#ffffff', padding: '20px', borderRadius: '10px' }}>
        <Grid container spacing={3} direction={'column'}>
          <Grid item>
            <h1>步数趋势</h1>
            <hr style={{ border: 'none', borderTop: '1px solid #CACACA', margin: '20px 0' }} />
            <h2>{analysis}</h2>
            <h4>
              {props.startTime}到{props.endTime}，共走了{steps}步，日均{averageSteps}步。
            </h4>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
