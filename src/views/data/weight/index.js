import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';
import TotalWeightLineChart from './TotalWeightLineChart';
import WeightGoalSetCard from './WeightGoalSetCard';
import WeightConditionCard from './WeightConditionCard';
import BmiCard from "./bmiCard";
import WeightLossCard from "./WeightLossCard";
import SmallTipCard from "./smallTipCard";

const DataWeight = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item lg={8} xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <TotalWeightLineChart isLoading={isLoading} />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item lg={6} xs={12}>
                <BmiCard />
              </Grid>
              <Grid item lg={6} xs={12}>
                <WeightLossCard />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={4} xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <WeightConditionCard />
          </Grid>
          <Grid item xs={12}>
            <WeightGoalSetCard />
          </Grid>
          <Grid item xs={12}>
            <SmallTipCard />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DataWeight;
