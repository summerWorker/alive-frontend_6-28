import MainCard from "../../../ui-component/cards/MainCard";
import {Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import {useTheme} from '@mui/material/styles';
import BloodtypeOutlinedIcon from '@mui/icons-material/BloodtypeOutlined';


const BloodSugarCard = () => {
    const theme = useTheme();

    return (
      <MainCard border={false} content={false}>
        <Box sx={{ p: 2 }}>
          <List sx={{ py: 0 }} style={{ marginTop: "3%" }}>
            <ListItem alignItems="center" disableGutter sx={{ py: 0 }} style={{ marginLeft: "3%", marginBottom: "3%" }}>
              <ListItemAvatar style={{marginRight: "3%"}}>
                 <Avatar
                    variant="rounded"
                    sx={{
                        backgroundColor: theme.palette.warning.light,
                        color: theme.palette.warning.dark
                    }}
                 >
                    <BloodtypeOutlinedIcon fontSize="inherit" />
                 </Avatar>
              </ListItemAvatar>
              <ListItemText
                sx={{
                    py: 0,
                    mt: 0.45,
                    mb: 0.45
                }}
                style={{marginRight: "8%"}}
                primary={<Typography variant="h6">...........</Typography>}
              />
            </ListItem>
          </List>
        </Box>
      </MainCard>
    );
};

export default BloodSugarCard;