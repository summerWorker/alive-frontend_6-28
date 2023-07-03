import { useState } from 'react';

export function ReachGoalCondition() {
  const [analysis, setAnalysis] = useState('同比持平');
  const [reachDays, setReachDays] = useState(0);

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
