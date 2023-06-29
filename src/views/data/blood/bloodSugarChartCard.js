import MainCard from "../../../ui-component/cards/MainCard";
import {CardContent, Grid, Typography} from "@mui/material";
import {gridSpacing} from "../../../store/constant";

const BloodSugarChartCard = () => {
  return (
    <MainCard content={false}>
      <CardContent>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    <Typography variant="subtitle2"></Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </MainCard>
  );
};

export default BloodSugarChartCard;