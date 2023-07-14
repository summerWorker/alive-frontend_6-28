import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import Google from 'assets/images/icons/social-google.svg';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {register} from "../../../../service/AuthService";

// ===========================|| FIREBASE - REGISTER ||=========================== //

const FirebaseRegister = ({ ...others }) => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const customization = useSelector((state) => state.customization);
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);

  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();
  const [isCodeSent, setIsCodeSent] = useState(false);
  const handleGetCode = async () => {
    try {
      // 向后端发送请求获取验证码，传递邮箱参数
      const response = await fetch(`/api/get-code?email=${values.email}`);
      // 检查响应状态码
      if (response.ok) {
        setIsCodeSent(true); // 设置验证码已发送
      } else {
        // 处理错误情况
        // ...
      }
    } catch (error) {
      // 处理错误情况
      // ...
    }
  };


  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('123456');
  }, []);

  return (
      <>
        <Grid container direction="column" justifyContent="center" spacing={2}>
          <Grid item xs={12} container alignItems="center" justifyContent="center">
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1">Sign up with Email address</Typography>
            </Box>
          </Grid>
        </Grid>

        <Formik
            initialValues={{
              email: '',
              password: '',
              submit: null
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
              try {
                if (scriptedRef.current) {
                  setStatus({ success: true });
                  setSubmitting(false);
                  try {
                    if (isCodeSent) {
                      // 执行注册操作
                      // ...
                    } else {
                      try {
                        // 发送获取验证码的请求，传递邮箱参数
                        await register(values).then((res) => {
                            console.log(res);
                            if (res) {
                              setIsCodeSent(true); // 设置验证码已发送
                            }
                        });

                      } catch (error) {
                        // 处理获取验证码失败的情况
                      }
                    }
                  } catch (error) {
                    // 处理提交失败的情况
                  }
                }
              } catch (err) {
                console.error(err);
                if (scriptedRef.current) {
                  setStatus({ success: false });
                  setErrors({ submit: err.message });
                  setSubmitting(false);
                }
              }
            }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
              <form noValidate onSubmit={handleSubmit} {...others}>
                <Grid container spacing={matchDownSM ? 0 : 2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="用户名"
                        margin="normal"
                        name="fname"
                        type="text"
                        defaultValue=""
                        sx={{ ...theme.typography.customInput }}
                    />
                  </Grid>
                </Grid>
                <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-email-register">Email Address </InputLabel>
                  <OutlinedInput
                      id="outlined-adornment-email-register"
                      type="email"
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                  />
                  {touched.email && errors.email && (
                      <FormHelperText error id="standard-weight-helper-text--register">
                        {errors.email}
                      </FormHelperText>
                  )}
                </FormControl>

                <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
                  <OutlinedInput
                      id="outlined-adornment-password-register"
                      type={showPassword ? 'text' : 'password'}
                      value={values.password}
                      name="password"
                      label="Password"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e);
                        changePassword(e.target.value);
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              size="large"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      inputProps={{}}
                  />
                  {touched.password && errors.password && (
                      <FormHelperText error id="standard-weight-helper-text-password-register">
                        {errors.password}
                      </FormHelperText>
                  )}
                </FormControl>
                <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-password-register">验证码</InputLabel>
                  <OutlinedInput
                      id="outlined-adornment-password-register"
                      value={values.password}
                      name="checkcode"
                      label="Checkcode"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e);
                        changePassword(e.target.value);
                      }}
                      inputProps={{}}
                  />
                  {touched.password && errors.password && (
                      <FormHelperText error id="standard-weight-helper-text-password-register">
                        {errors.password}
                      </FormHelperText>
                  )}
                </FormControl>
                {isCodeSent ? (
                    <Typography variant="subtitle1">验证码已发送至您的邮箱，请查收。</Typography>
                ) : (
                    <Box sx={{ mt: 2 }}>
                      <AnimateButton>
                        <Button
                            disableElevation
                            disabled={isSubmitting}
                            fullWidth
                            size="large"
                            variant="contained"
                            color="secondary"
                        >
                          获取验证码
                        </Button>
                      </AnimateButton>
                    </Box>
                )}

                {strength !== 0 && (
                    <FormControl fullWidth>
                      <Box sx={{ mb: 2 }}>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item>
                            <Box style={{ backgroundColor: level?.color }} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
                          </Grid>
                          <Grid item>
                            <Typography variant="subtitle1" fontSize="0.75rem">
                              {level?.label}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </FormControl>
                )}

                <Grid container alignItems="center" justifyContent="space-between">
                  <Grid item>
                    <FormControlLabel
                        control={
                          <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                        }
                        label={
                          <Typography variant="subtitle1">
                            Agree with &nbsp;
                            <Typography variant="subtitle1" component={Link} to="#">
                              Terms & Condition.
                            </Typography>
                          </Typography>
                        }
                    />
                  </Grid>
                </Grid>
                {errors.submit && (
                    <Box sx={{ mt: 3 }}>
                      <FormHelperText error>{errors.submit}</FormHelperText>
                    </Box>
                )}

                <Box sx={{ mt: 2 }}>
                  <AnimateButton>
                    <Button
                        disableElevation
                        disabled={isSubmitting || isCodeSent}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="secondary"
                    >
                      登录
                    </Button>

                  </AnimateButton>
                </Box>
              </form>
          )}
        </Formik>
      </>
  );
};

export default FirebaseRegister;
