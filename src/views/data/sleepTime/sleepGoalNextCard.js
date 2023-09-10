import { Avatar, Box, Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';
import { styled, useTheme } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: '#9EF8EE',
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: '#22BABB',
    borderRadius: '50%',
    top: -85,
    right: -95,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140
    }
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: '#348888',
    borderRadius: '50%',
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down('sm')]: {
      top: -155,
      right: -70
    }
  }
}));

export function SleepGoalNextCard(props) {
  const theme = useTheme();

  return (
    <>
      <CardWrapper border={false} content={false}>
        <Box sx={{ p: 2.25 }}>
          <h2 style={{ color: '#008F8C' }}>下一次</h2>
          <h4 style={{ color: '#008F8C' }}>周五</h4>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={6}>
              <h4 style={{ color: '#008F8C' }}>就寝</h4>
              <h1 style={{ color: '#008F8C' }}>{props.bedTime}</h1>
            </Grid>
            <Grid item xs={6}>
              <h4 style={{ color: '#008F8C' }}>起床</h4>
              <h1 style={{ color: '#008F8C' }}>{props.getUpTime}</h1>
            </Grid>
          </Grid>
        </Box>
      </CardWrapper>
    </>
  );
}
