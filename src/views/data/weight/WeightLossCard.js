import { useTheme } from '@mui/material/styles';
import MainCard from '../../../ui-component/cards/MainCard';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';

const WeightLossCard = () => {
  const theme = useTheme();

  return (
    <MainCard border={false} content={false} style={{ height: '180px' }}>
      <Box sx={{ p: 2 }}>
        <List sx={{ py: 0 }}>
          <ListItem alignItems="center" disableGutter sx={{ py: 0 }}>
            <ListItemAvatar style={{ marginRight: '3%' }}>
              <Avatar
                variant="rounded"
                sx={{
                  ...theme.typography.commanAvatar,
                  ...theme.typography.largeAvatar,
                  backgroundColor: theme.palette.warning.light,
                  color: theme.palette.warning.dark
                }}
              >
                <ThumbUpOutlinedIcon fontSize="inherit" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              sx={{
                py: 0,
                mt: 0.45,
                mb: 0.45
              }}
              primary={<Typography variant="h4">您已经减重了xxxkg!</Typography>}
            ></ListItemText>
          </ListItem>
          <ListItem alignItems="center" disableGutters sx={{ py: 0 }} style={{ marginTop: '15%', marginLeft: '5%' }}>
            <ListItemText
              sx={{
                py: 0,
                mt: 0.45,
                mb: 0.45
              }}
              primary={<Typography variant="h4">点击查看接下来一段时间的计划！</Typography>}
            ></ListItemText>
          </ListItem>
        </List>
      </Box>
    </MainCard>
  );
};

export default WeightLossCard;
