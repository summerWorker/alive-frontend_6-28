import MainCard from '../../../ui-component/cards/MainCard';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';

const SmallTipCard = () => {
  return (
    <MainCard border={false} content={false}>
      <Box sx={{ p: 2 }}>
        <List sx={{ py: 0 }}>
          <ListItem alignItems="center" disableGutters sx={{ py: 0 }} style={{ marginleft: '3%' }}>
            <ListItemText
              sx={{
                py: 0,
                mt: 0.45,
                mb: 0.45
              }}
              primary={<Typography variant="h3">Three things you need to know</Typography>}
            ></ListItemText>
          </ListItem>
        </List>
      </Box>
    </MainCard>
  );
};

export default SmallTipCard;
