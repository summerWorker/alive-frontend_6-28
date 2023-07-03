import MainCard from '../../../ui-component/cards/MainCard';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';

// import Chart from 'react-apexcharts';
// import chartData from '../chart-data/weight-condition';

const WeightConditionCard = () => {
  return (
    <MainCard border={false} content={false}>
      <Box sx={{ p: 2 }}>
        <List sx={{ py: 0 }}>
          <ListItem alignItems="center" disableGutter sx={{ py: 0 }}>
            <ListItemText
              sx={{
                py: 0,
                mt: 0.45,
                mb: 0.45
              }}
              primary={<Typography variant="h4">您的健康状况: 健康</Typography>}
            />
          </ListItem>
        </List>
      </Box>
    </MainCard>
  );
};

export default WeightConditionCard;
