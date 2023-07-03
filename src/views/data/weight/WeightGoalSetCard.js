import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import MainCard from '../../../ui-component/cards/MainCard';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography, TextField, Button } from '@mui/material';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import InputAdornment from '@mui/material/InputAdornment';

const WeightGoalSetCard = (props) => {
  const theme = useTheme();

  const [curGoal, setCurGoal] = useState(props.goal);

  function handleChange(e){
      const {name, value} = e.target;
      // props.goalChange(value);
      // console.log(name, value);
      setCurGoal(value);
  }

  function handleGoalChange(e){
      e.preventDefault();
      props.updateGoal(curGoal);
  }


  return (
    <MainCard border={false} content={false}>
      <Box sx={{ p: 2 }}>
        <List sx={{ py: 0 }}>
          <ListItem alignItems="center" disableGutters sx={{ py: 0 }} style={{marginLeft: "3%"}}>
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
                <FlagOutlinedIcon fontSize="inherit" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              sx={{
                py: 0,
                mt: 0.45,
                mb: 0.45
              }}
              primary={<Typography variant="h3">Set Your Goal!</Typography>}
            />
          </ListItem>
          <ListItem alignItems="center" disableGutters sx={{ py: 0 }} style={{marginTop: "3%"}}>
            <TextField
              label="set your goal here"
              id="outlined-start-adornment"
              sx={{ m: 1, width: '65%'}}
              InputProps={{
                endAdornment: <InputAdornment position="end">kg</InputAdornment>
              }}
              name="goal"
              value={curGoal}
              onChange={handleChange}
            />
            <Button variant="outlined"
                    style={{height: "6ch", borderColor: "#ffe57f", borderRadius: "10px", color: "#ffc107"}}
                    onClick={handleGoalChange}
            >Confirm</Button>
          </ListItem>
        </List>
      </Box>
    </MainCard>
  );
};

export default WeightGoalSetCard;
