import { useTheme } from '@mui/material/styles';
import MainCard from '../../../ui-component/cards/MainCard';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography, TextField, Button } from '@mui/material';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import InputAdornment from '@mui/material/InputAdornment';

const WeightGoalSetCard = () => {
  const theme = useTheme();

  return (
    <MainCard border={false} content={false}>
      <Box sx={{ p: 2 }}>
        <List sx={{ py: 0 }}>
          <ListItem alignItems="center" disableGutters sx={{ py: 0 }} style={{ marginLeft: '3%' }}>
            <ListItemAvatar style={{ marginRight: '5%' }}>
              <Avatar
                variant="rounded"
                sx={{
                  ...theme.typography.commanAvatar,
                  ...theme.typography.largeAvatar,
                  backgroundColor: theme.palette.warning.light,
                  color: theme.palette.warning.dark
                }}
              >
                <FlagOutlinedIcon fontSize="inherit" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              sx={{
                py: 0,
                mt: 0.45,
                mb: 0.45
              }}
              primary={<Typography variant="h3">设置您的目标</Typography>}
            />
          </ListItem>
          <ListItem alignItems="center" disableGutters sx={{ py: 0 }} style={{ marginTop: '3%' }}>
            <TextField
              label="在此设置您的目标"
              id="outlined-start-adornment"
              sx={{ m: 1, width: '65%' }}
              InputProps={{
                endAdornment: <InputAdornment position="end">kg</InputAdornment>
              }}
            />
            <Button variant="outlined" style={{ height: '6ch', borderColor: '#ffe57f', borderRadius: '10px', color: '#ffc107' }}>
              确认
            </Button>
          </ListItem>
        </List>
      </Box>
    </MainCard>
  );
};

export default WeightGoalSetCard;
