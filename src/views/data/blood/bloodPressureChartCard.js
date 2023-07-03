import MainCard from "../../../ui-component/cards/MainCard";
import {Button, Card, CardContent, Grid, Typography} from "@mui/material";
import {gridSpacing} from "../../../store/constant";
import {useState} from "react";
import getBloodPressureChartData from "./chart-data/blood-pressure-chart";
import Chart from "react-apexcharts";

const BloodPressureChartCard = (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // week: true; month: false
  const [timeValue, setTimeValue] = useState(true);
  const handleChangeTime = (event, newValue) => {
    setTimeValue(newValue);
  };

  // week / month category
  let weekCate = [], monthCate = [];
  let week_data = [[], []], month_data = [[], []];
  const today = new Date();
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
  for(let i = 0; i < 7; ++i){
    weekCate[6 - i] = weekDays[(today.getDay() - i + 7) % 7];
    week_data[0].push(props.weekData[i][0]);
    week_data[1].push(props.weekData[i][1]);
  }
  for(let i = 0; i < 30; ++i){
    monthCate[29 - i] = today.getDate() - i;
    // month_data[0].push(props.monthData[i][0]);
    // month_data[1].push(props.monthData[i][1]);
  }


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
             {timeValue ? <Chart {...getBloodPressureChartData(weekCate, week_data)} /> : <Chart {...getBloodPressureChartData(monthCate, month_data)} /> }
           </Grid>
         </Grid>
       </CardContent>
     </MainCard>
   );
};

export default BloodPressureChartCard;