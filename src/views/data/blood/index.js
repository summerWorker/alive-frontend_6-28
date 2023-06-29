import {Grid} from "@mui/material";
import {gridSpacing} from "../../../store/constant";
import BloodPressureChartCard from "./bloodPressureChartCard";

const DataBlood = () => {
    return (
      <Grid container spacing={gridSpacing}>
        <Grid item lg={6} xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <BloodPressureChartCard />
            </Grid>
            <Grid item xs={12}>

            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>

            </Grid>
            <Grid item xs={12}>

            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
};

export default DataBlood;