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
import {endpoint} from "../../../../utils/endpoint";
import {getcheckcode} from "../../../../service/dataService/loginService";
import * as loginService from "../../../../service/dataService/loginService";

// ===========================|| FIREBASE - REGISTER ||=========================== //

const FirebaseRegister = ({ ...others }) => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const customization = useSelector((state) => state.customization);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [checked, setChecked] = useState(true);

  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();

  const googleHandler = async () => {
    console.error('Register');
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  }

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

  const getCheckCode = (email) => {
    if(email === '') {
      alert('Please input your email address');
    }else{
      const url = endpoint + '/getCheckCode';
      const data = {email: email};
      function callback(data) {
        if(data.status > 0) {
          alert('验证码已发送');
        }else {
          alert(data.msg);
        }
      }
      loginService.getcheckcode(url, data, callback).then();
    }
  }


  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">请用邮箱注册</Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          email: '',
          password: '',
          submit: null,
          userName: '',
          confirmPassword: '',
          checkCode: ''
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('请输入合法的邮箱账号').max(255).required('请输入邮箱账号'),
          password: Yup.string().max(255).required('请输入密码'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            if(values.password !== values.confirmPassword) {
              setErrors({submit: '两次输入的密码不一致'});
              setSubmitting(false);
              alert('两次输入的密码不一致');
            }else if(values.userName === '') {
              alert('请输入昵称');
            }else if(values.email === ""){
              alert('请输入邮箱账号');
            }else if(values.checkCode === "") {
                alert('请输入验证码');
            }else if(values.password === "") {
                alert('请输入密码');
            }else if(values.confirmPassword === "") {
                alert('请确认密码');
            }else{
              const url = endpoint + '/register';
              const data = {username: values.userName, password: values.password, email: values.email, check_code: values.checkCode};
              function callback(data) {
                if(data.status > 0) {
                    alert('注册成功');
                    // jump to login page
                    window.location.href = '/pages/login/login3';
                }else {
                    alert('注册失败，请重试');
                }
              }
                loginService.register(url, data, callback).then();
            }
            // console.log(values);
            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
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
            <FormControl fullWidth error={Boolean(touched.userName && errors.userName)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-register">昵称</InputLabel>
              <OutlinedInput
                  id="outlined-adornment-password-register"
                  type="text"
                  value={values.userName}
                  name="userName"
                  label="userName"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  inputProps={{}}
              />
              {touched.userName && errors.userName && (
                  <FormHelperText error id="standard-weight-helper-text-password-register">
                    {errors.userName}
                  </FormHelperText>
              )}
            </FormControl>
            <Grid container spacing={matchDownSM ? 0 : 2}>
              <Grid item lg={9}>
            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-register">邮箱账号</InputLabel>
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
              </Grid>
              <Grid item lg={3}>
                <FormControl fullWidth style={{marginTop: "8%"}}>
            <Button variant="outlined"
                    style={{ borderColor: '#ffe57f', borderRadius: '10px', color: '#ffc107' }}
                    onClick={() => getCheckCode(values.email)}
            >
              获取<br/>验证码
            </Button>
                </FormControl>
              </Grid>
            </Grid>
            <FormControl fullWidth error={Boolean(touched.checkCode && errors.checkCode)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-register">验证码</InputLabel>
              <OutlinedInput
                  id="outlined-adornment-password-register"
                  type="text"
                  value={values.checkCode}
                  name="checkCode"
                  label="checkCode"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  inputProps={{}}
              />
              {touched.checkCode && errors.checkCode && (
                  <FormHelperText error id="standard-weight-helper-text-password-register">
                    {errors.checkCode}
                  </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-register">密码</InputLabel>
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

            <FormControl fullWidth error={Boolean(touched.confirmPassword && errors.confirmPassword)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-register">确认密码</InputLabel>
              <OutlinedInput
                  id="outlined-adornment-password-register"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={values.confirmPassword}
                  name="confirmPassword"
                  label="confirmPassword"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                      >
                        {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  inputProps={{}}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                  <FormHelperText error id="standard-weight-helper-text-password-register">
                    {errors.confirmPassword}
                  </FormHelperText>
              )}
            </FormControl>

            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                  }
                  label={
                    <Typography variant="subtitle1">
                      同意 &nbsp;
                      <a href="https://my-h5news.app.xinhuanet.com/h5/privacy.html" target="_blank" rel="noopener noreferrer">
                        隐私条款
                      </a>
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
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  注册账号
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
