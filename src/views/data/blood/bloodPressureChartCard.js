import MainCard from "../../../ui-component/cards/MainCard";
import {Button, Card, CardContent, Grid, Typography} from "@mui/material";
import {gridSpacing} from "../../../store/constant";
import {useState} from "react";
import getBloodPressureChartData from "./chart-data/blood-pressure-chart";
import Chart from "react-apexcharts";

const BloodPressureChartCard = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [timeValue, setTimeValue] = useState(false);
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
                     <Typography variant="subtitle2">Avg. Systolic</Typography>
                   </Grid>
                   <Grid item>
                       <Typography variant="h3">mmHg</Typography>
                   </Grid>
                 </Grid>
               </Grid>
               <Grid item>
                 <Grid container direction="column" spacing={1}>
                   <Grid item>
                     <Typography variant="subtitle2">Avg. Diastolic</Typography>
                   </Grid>
                   <Grid item>
                     <Typography variant="h3">mmHg</Typography>
                   </Grid>
                 </Grid>
               </Grid>
               <Grid item>
                 <Button
                     disableElevation
                     variant={timeValue ? 'contained' : 'text'}
                     size="small"
                     sx={{ color: 'success[200]' }}
                     onClick={(e) => handleChangeTime(e, true)}
                 >
                   Week
                 </Button>
                 <Button
                     disableElevation
                     variant={!timeValue ? 'contained' : 'text'}
                     size="small"
                     sx={{ color: 'success[200]' }}
                     onClick={(e) => handleChangeTime(e, false)}
                 >
                   Month
                 </Button>
               </Grid>
             </Grid>
           </Grid>
           <Grid item xs={12} sx={{ pt: '16px !important'}}>
             <Card>
              <Grid item>
                <Chart {...getBloodPressureChartData}  />
              </Grid>
             </Card>
           </Grid>
         </Grid>
       </CardContent>
     </MainCard>
   );
};

export default BloodPressureChartCard;