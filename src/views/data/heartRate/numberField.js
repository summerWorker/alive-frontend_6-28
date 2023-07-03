import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

const NumberField = (props) => {
  const [value, setValue] = useState('');
  const [warningMessage, setWarningMessage] = useState('');

  const handleInputChange = (event) => {
    const inputValue = event.target.value;

    // 检查输入值是否为数字
    if (!isNaN(inputValue)) {
      setWarningMessage('');
      setValue(inputValue);
    } else {
      setWarningMessage('请输入数字');
      setValue('');
    }
  };

  return (
    <TextField
      label={props.label}
      value={value}
      onChange={handleInputChange}
      error={warningMessage !== ''}
      helperText={warningMessage}
      id="outlined-start-adornment"
      sx={{ m: 1, width: '65%' }}
      InputProps={{
        endAdornment: <InputAdornment position="end">/min</InputAdornment>
      }}
    />
  );
};

export default NumberField;
