import MainCard from "../../../ui-component/cards/MainCard";
import {Button, CardContent, Grid, Typography} from "@mui/material";
import {gridSpacing} from "../../../store/constant";
import {useState} from "react";
import {getBloodSugarChartData} from "./chart-data/blood-sugar-chart";
import Chart from "react-apexcharts";

const BloodSugarChartCard = (props) => {
  // week: true; month: false
  const [timeValue, setTimeValue] = useState(true);
  const handleChangeTime = (event, newValue) => {
    setTimeValue(newValue);
  };


  return (
    <MainCard content={false}>
      <CardContent>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    <Typography variant="subtitle2">Avg</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h3">mmol/L</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Button
                  disableElevation
                  variant={timeValue ? 'contained' : 'text'}
                  size="small"
                  sx={{color: 'success[200]'}}
                  onClick={(e) => handleChangeTime(e, true)}
                >
                  Week
                </Button>
                <Button
                    disableElevation
                    variant={!timeValue ? 'contained' : 'text'}
                    size="small"
                    sx={{color: 'success[200]'}}
                    onClick={(e) => handleChangeTime(e, false)}
                >
                  Month
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ pt: '16px !important'}}>
            {timeValue ? <Chart {...getBloodSugarChartData(props.weekData)} /> : <Chart {...getBloodSugarChartData(props.monthData)} />}
          </Grid>
        </Grid>
      </CardContent>
    </MainCard>
  );
};

export default BloodSugarChartCard;