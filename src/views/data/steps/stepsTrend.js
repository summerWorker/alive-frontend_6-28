import { Grid } from '@mui/material';
import { useState } from 'react';

export function StepsTrend(props) {
  const [steps, setSteps] = useState(0);
  const [averageSteps, setAverageSteps] = useState(0);
  const [analysis, setAnalysis] = useState('日均步数同比持平');

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
