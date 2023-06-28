import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';
// import TotalOrderLineChartCard from '../dashboard/Default/TotalOrderLineChartCard';
// import TotalGrowthBarChart from '../dashboard/Default/TotalGrowthBarChart';
// import TotalWeightLineChartCard from "./TotalWeightLineChartCard";
// import TotalSleepLineChartCard from "./TotalSleepLineChartCard";
// import PopularCard from "../dashboard/Default/PopularCard";
import AdviceCard from "./adviceCard";
import SleepChart from "./SleepChart";
import WeightCard from "./weightCard";
import HeightCard from "./heightCard";
// import StepCard from "./stepCard";
import HeartRateCard from "./heartRateCard";
import CircleCard from "./circleCard";
import StepChartCard from "./stepChartCard";

// ==============================|| DATA ANALYTICS ||============================== //

const Analytics = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item lg={3} xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <WeightCard isLoading={isLoading} />
          </Grid>
          <Grid item xs={12}>
            <HeightCard isLoading={isLoading} />
          </Grid>
          {/*<Grid item xs={12}>*/}
          {/*  <StepCard isLoading={isLoading} />*/}
          {/*</Grid>*/}
          <Grid item xs={12}>
            <HeartRateCard isLoading={isLoading} />
          </Grid>
          <Grid item xs={12}>
            <CircleCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={6} xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <SleepChart isLoading={isLoading} />
          </Grid>
          <Grid item xs={12}>
            <StepChartCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={3} xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <AdviceCard isLoading={isLoading} />
          </Grid>
        </Grid>
        <Grid container spacing={gridSpacing}></Grid>
      </Grid>
    </Grid>
  );
};

export default Analytics;
