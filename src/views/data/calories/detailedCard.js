// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, Grid, Typography } from '@mui/material';

// project imports
import CustomizedCart from './customizedCart';

// ===========================|| DASHBOARD DEFAULT - BAJAJ AREA CHART CARD ||=========================== //
/*
 * @Brief: 折线图
 * @Param: options:表格定义 title:标题 subtitle:副标题
 * @example:
 * */
const DetailedCard = ({ options, title, subtitle }) => {
  const theme = useTheme();
  const date = new Date();

  return (
    <Card style={{ background: 'white', width: '85%' }}>
      <Grid container sx={{ p: 2, pb: 0, color: '#fff' }}>
        <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="subtitle1" sx={{ color: theme.palette.grey[800] }}>
                {date.getMonth() + 1}月{date.getDate()}日
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h4" sx={{ color: theme.palette.grey[800] }}>
                {title}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ color: theme.palette.grey[800] }}>
            {subtitle}
          </Typography>
        </Grid>
      </Grid>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <CustomizedCart options={options} />
      </div>
    </Card>
  );
};

export default DetailedCard;
