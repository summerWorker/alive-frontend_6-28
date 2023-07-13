import {styled, useTheme} from '@mui/material/styles';
import MainCard from '../../../ui-component/cards/MainCard';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';

const CardWrapper = styled(MainCard)(({ theme }) => ({
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
        borderRadius: '50%',
        top: -30,
        right: -180
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
        borderRadius: '50%',
        top: -160,
        right: -130
    }
}));

const WeightLossCard = (props) => {
  const theme = useTheme();

  return (
    <CardWrapper border={false} content={false} style={{ height: '180px', marginBottom: "5%" }}>
      <Box sx={{ p: 2 }}>
        <List sx={{ py: 0 }}>
          <ListItem alignItems="center" sx={{ py: 0 }}>
            {/*<ListItemAvatar style={{ marginRight: '3%' }}>*/}
            {/*  <Avatar*/}
            {/*    variant="rounded"*/}
            {/*    sx={{*/}
            {/*      ...theme.typography.commanAvatar,*/}
            {/*      ...theme.typography.largeAvatar,*/}
            {/*      backgroundColor: theme.palette.warning.light,*/}
            {/*      color: theme.palette.warning.dark*/}
            {/*    }}*/}
            {/*  >*/}
            {/*    <ThumbUpOutlinedIcon fontSize="inherit" />*/}
            {/*  </Avatar>*/}
            {/*</ListItemAvatar>*/}
            <ListItemText
              sx={{
                py: 0,
                mt: 0.45,
                mb: 0.45
              }}
              primary={<Typography variant="h4">您的健康状况: {props.condition}</Typography>}
            ></ListItemText>
          </ListItem>
          <ListItem alignItems="center" sx={{ py: 0 }} style={{ marginTop: '5%', marginLeft: '0%', marginRight: "5%"}}>
            <ListItemText
              sx={{
                py: 0,
                mt: 0.45,
                mb: 0.45
              }}
              primary={<Typography variant="h5">{props.advice}</Typography>}
            ></ListItemText>
          </ListItem>
        </List>
      </Box>
    </CardWrapper>
  );
};

export default WeightLossCard;
