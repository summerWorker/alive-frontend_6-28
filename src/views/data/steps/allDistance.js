import { useState } from 'react';

export function AllDistance() {
  const [analysis, setAnalysis] = useState('同比持平');
  const [distance, setDistance] = useState(0);
  const [averageDistance, setAverageDistance] = useState(0);
  return (
    <>
      <div style={{ background: '#ffffff', padding: '20px', borderRadius: '10px' }}>
        <h1>总距离</h1>
        <hr style={{ border: 'none', borderTop: '1px solid #CACACA', margin: '20px 0' }} />
        <h2>{analysis}</h2>
        <h4>
          共走了{distance}公里，日均{averageDistance}公里。
        </h4>
      </div>
    </>
  );
}
