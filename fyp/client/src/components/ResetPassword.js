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
import { Context } from "../context/Context";
import { Alert, Collapse, IconButton } from '@mui/material';
import AlertTitle from '@mui/material/AlertTitle';
import CloseIcon from '@mui/icons-material/Close';
import {useParams} from 'react-router-dom';


const theme = createTheme();

export default function ResetPassword() {
    const {resetToken} = useParams();

  const [isUserVerifiedUser, setIsUserVerifiedUser] = useState();
  const { user, dispatch, isFetching } = useContext(Context);

  // const { search } = useLocation();
  // const [id, setId] = useState(null);
  useEffect(() => {
  }, []);
  const userRef = useRef();
  const passwordRef = useRef();
  const [open, setOpen] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.put("/auth/reset_password", {
        newPass: passwordRef.current.value,
        resetLink:resetToken
      });
      console.log(" password change");
    //   dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      res.data && window.location.replace("/login")
    } catch (err) {
    //   dispatch({ type: "LOGIN_FAILURE" });
      console.log(" password not change");

    //   setOpen(true);

    }


  };

  // const handleDelete = async (id) => {
  //   setSuccess(false);
  //   setError(false);
  //   try {
  //     await axiosJWT.delete("/users/" + id, {
  //       headers: { authorization: "Bearer " + user.accessToken },
  //     });
  //     setSuccess(true);
  //   } catch (err) {
  //     setError(true);
  //   }
  // };
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
          <Collapse in={open}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >

                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              <strong>Account not Verified!</strong>
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
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={passwordRef}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isFetching}
              >
                Send
              </Button>
            
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}