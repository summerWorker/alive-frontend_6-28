import { Avatar, Box, Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';
import { styled, useTheme } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import { FileAddFilled } from '@ant-design/icons';
const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: '#B4CF66',
  color: '#146152',
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: '#44803F',
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
    background: '#FFEC5C',
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

const ChartContainer = styled('div')({
  position: 'relative',
  zIndex: 1
});

export function SleepGoalCard() {
  const theme = useTheme();

  return (
    <>
      <CardWrapper border={false} content={false}>
        <Box sx={{ p: 2.25 }}>
          <Grid container spacing={gridSpacing} justifyContent={'space-between'}>
            <Grid item>
              <h2 style={{ color: '#164C45' }}>所有定时</h2>
              <h4 style={{ color: '#164C45' }}>每天</h4>
            </Grid>
            <Grid item>
              <ChartContainer>
                <Avatar
                  variant="rounded"
                  sx={{
                    ...theme.typography.commonAvatar,
                    ...theme.typography.largeAvatar,
                    backgroundColor: '#E3C75F',
                    mt: 1
                  }}
                >
                  <FileAddFilled />
                </Avatar>
              </ChartContainer>
            </Grid>
          </Grid>

          <Grid container spacing={gridSpacing}>
            <Grid item xs={6}>
              <h4 style={{ color: '#164C45' }}>就寝</h4>
              <h1 style={{ color: '#164C45' }}>23:00</h1>
            </Grid>
            <Grid item xs={6}>
              <h4 style={{ color: '#164C45' }}>起床</h4>
              <h1 style={{ color: '#164C45' }}>07:00</h1>
            </Grid>
          </Grid>
        </Box>
      </CardWrapper>
    </>
  );
}
