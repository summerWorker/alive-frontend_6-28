import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import MainCard from '../../../ui-component/cards/MainCard';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography, TextField, Button } from '@mui/material';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import {DatePicker, Input, TimePicker } from "antd";
import {MobileDatePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";


const format = 'HH:mm';
const PressureAddCard = (props) => {
    return (
        <MainCard border={false} content={false}>
            <Box sx={{ p: 2 }}>
                <List sx={{ py: 0 }}>
                    <ListItem>
                        <ListItemText
                            sx={{
                                py: 0,
                                mt: 0.45,
                                mb: 0.45
                            }}
                            primary={<Typography variant="h4">添加过往数据</Typography>}
                        />
                        <DatePicker
                            value={dayjs(props.date)}
                            onChange={(date) => props.setDate(date)}
                            style={{marginRight: "5%", }}
                        />
                        {/*<TimePicker*/}
                        {/*    value={dayjs(props.time, format)}*/}
                        {/*    onChange={(time) => props.setTime(time)}*/}
                        {/*    format={format}*/}
                        {/*/>*/}
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            sx={{
                                py: 0,
                                mt: 0.45,
                                mb: 0.45
                            }}
                            primary={<Typography variant="h6">收缩压</Typography>}
                        />
                        <Input style={{width: "30%", marginLeft: "5%", marginRight: "5%"}}
                               value={props.systolic} onChange={(event) => props.setSystolic(event.target.value)} />
                        <ListItemText
                            sx={{
                                py: 0,
                                mt: 0.45,
                                mb: 0.45
                            }}
                            primary={<Typography variant="h6">舒张压</Typography>}
                        />
                        <Input style={{width: "30%", marginLeft: "5%", marginRight: "5%"}}
                               value={props.diastolic} onChange={(event) => props.setDiastolic(event.target.value)} />
                    </ListItem>
                    <ListItem style={{marginLeft: "40%", marginRight: "40%"}}>
                        <Button variant="outlined"
                                style={{ height: '4ch', borderColor: '#ffe57f', borderRadius: '5px', color: '#ffc107' }}
                                onClick={() => props.addPressure()}
                        >
                            确认
                        </Button>
                    </ListItem>
                </List>
            </Box>
        </MainCard>
    );
};

export default PressureAddCard;
