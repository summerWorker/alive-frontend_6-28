import { useEffect, useState } from 'react';

export function ReachGoalCondition(props) {
  const [analysis, setAnalysis] = useState('同比持平');
  const [reachDays, setReachDays] = useState(0);

  useEffect(() => {
    if (props.data && props.data.length > 0) {
      let reachDays = 0;
      props.data.forEach((item) => {
        if (item.goal !== 0 && item.step >= item.goal) {
          reachDays++;
        }
      });
      setReachDays(reachDays);

      //判断趋势
      const trend = reachDays >= props.data.length / 2 ? '达标天数多' : '达标天数少';
      setAnalysis(trend);
    }
  }, [props.data]);

  return (
    <>
      <div style={{ background: '#ffffff', padding: '20px', borderRadius: '10px' }}>
        <h1>达标情况</h1>
        <hr style={{ border: 'none', borderTop: '1px solid #CACACA', margin: '20px 0' }} />
        <h2>{analysis}</h2>
        <h4>达标{reachDays}天了。</h4>
      </div>
    </>
  );
}
