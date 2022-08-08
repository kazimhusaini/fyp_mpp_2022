import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { useContext, useRef } from "react";
import { Alert, Collapse, IconButton } from '@mui/material';
import AlertTitle from '@mui/material/AlertTitle';
import CloseIcon from '@mui/icons-material/Close';
import { validator } from "./Validator";
import useForm from "./useFormForLogin";
import { Context } from '../context/Context';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Signin({ sessionExpire, openSE,setOpenSE }) {

  // const [isUserVerifiedUser, setIsUserVerifiedUser] = useState([]);
  // const { search } = useLocation();
  // const [id, setId] = useState(null);
  useEffect(() => {
  }, []);
  const userRef = useRef();
  const passwordRef = useRef();
  const { user, dispatch, isFetching } = useContext(Context);

  // const [open, setOpen] = useState(false);
  const initState = {
    email: "",
    password: "",
    open: false
  };

  const submit = () => {
    console.log(" Submited");
  };

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    state,
    open,
    setOpen,
    eText,
    setEText,
    errors,
  } = useForm({
    initState,
    callback: submit,
    validator
  });


  let isValidForm =
    Object.values(errors).filter(error => typeof error !== "undefined")
      .length === 0;

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(' + require('./images/loginbg.jpg') + ')',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Collapse in={openSE?openSE:open}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                    setOpenSE(false);
                  }}

                >

                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              <strong>{sessionExpire? sessionExpire: eText}</strong>

            </Alert>
          </Collapse>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email"
                name="email"
                size='normal'
                defaultValue={state.email}
                onChange={handleChange}
                error={errors.email ? true : false}
                helperText={errors.email}
                onBlur={handleBlur}
                inputRef={userRef}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                size='normal'
                label="Password"
                name="password"
                type="password"
                defaultValue={state.password}
                onChange={handleChange}
                error={errors.password ? true : false}
                helperText={errors.password}
                onBlur={handleBlur}
                inputRef={passwordRef}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!isValidForm || isFetching}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/forgot_password" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/create_a_account" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}