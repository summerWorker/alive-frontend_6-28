import MainCard from "../../../ui-component/cards/MainCard";
import {Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import BloodtypeOutlinedIcon from '@mui/icons-material/BloodtypeOutlined';

const BloodPressureCard = (props) => {
    const theme = useTheme();


    return (
      <MainCard border={false} content={false}>
        <Box sx={{ p: 2}}>
          <List sx={{ py: 0}}>
            <ListItem alignItems="center" disableGutters sx={{ py: 0 }} style={{marginLeft: "3%", marginBottom: "3%"}}>
              <ListItemAvatar style={{marginRight: "5%"}}>
                <Avatar
                  variant="rounded"
                  sx={{
                      ...theme.typography.commanAvatar,
                      ...theme.typography.largeAvatar,
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
                primary={<Typography variant="h3">关于血压</Typography>}
              />
            </ListItem>
            <Divider sx={{ my: 0.5, mx: 2 }} />
            <ListItem>
              <ListItemText
                sx={{
                    py: 0,
                    mt: 0.45,
                    mb: 0.45
                }}
                primary={<Typography variant="subtitle2">血压是指心脏输送血液时血流对动脉壁产生的压力。
                    有两种测量方式。”收缩压“是指心脏跳动时输送血液所产生的血压。
                    “舒张压”是指。。。。。。。。。。</Typography>}
              />
            </ListItem>
          </List>
        </Box>
      </MainCard>
    );
};

export default BloodPressureCard;