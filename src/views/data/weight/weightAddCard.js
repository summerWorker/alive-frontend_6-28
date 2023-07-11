import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import MainCard from '../../../ui-component/cards/MainCard';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography, TextField, Button } from '@mui/material';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import {DatePicker, Input} from "antd";
import {MobileDatePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";

const WeightAddCard = (props) => {
    return (
        <MainCard border={false} content={false}>
            <Box sx={{ p: 2 }}>
                <List sx={{ py: 0 }}>
                    <ListItem alignItems="center" sx={{ py: 0 }} style={{ marginLeft: '3%' }}>
                        <ListItemText
                            sx={{
                                py: 0,
                                mt: 0.45,
                                mb: 0.45
                            }}
                            primary={<Typography variant="h4">添加过往数据</Typography>}
                        />
                    </ListItem>
                    <ListItem alignItems="center" sx={{ py: 0 }} style={{ marginTop: '3%' }}>
                        <DatePicker
                            value={dayjs(props.date)}
                            onChange={(date) => props.setDate(date)}
                        />
                        <Input style={{width: "40%", marginLeft: "5%", marginRight: "5%"}}
                               value={props.weight} onChange={(event) => props.setWeight(event.target.value)} />
                        <Button variant="outlined"
                                style={{ height: '4ch', borderColor: '#ffe57f', borderRadius: '5px', color: '#ffc107' }}
                                onClick={() => props.addWeight()}
                        >
                            确认
                        </Button>
                    </ListItem>
                </List>
            </Box>
        </MainCard>
    );
};

export default WeightAddCard;
