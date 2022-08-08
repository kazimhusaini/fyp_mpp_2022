import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useState } from "react";
// import { set } from '../../../api/app';
import { validator } from "./Validator";
import useForm from "./useForm";
import { Alert, Collapse, IconButton } from "@mui/material";
import AlertTitle from "@mui/material/AlertTitle";
import CloseIcon from "@mui/icons-material/Close";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Signup() {
  const initState = {
    username: "",
    email: "",
    password: "",
    cnic: "",
    number: "",
  };

  const submit = () => {
    console.log(" Submited");
  };

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    setOpen,
    open,
    eText,
    setEText,
    state,
    errors,
  } = useForm({
    initState,
    callback: submit,
    validator,
  });

  let isValidForm =
    Object.values(errors).filter((error) => typeof error !== "undefined")
      .length === 0;

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     setError(false);
  //     const res = await axios.post("/auth/register", {
  //       username,
  //       cnic,
  //       email,
  //       password
  //     });
  //     res.data && window.location.replace("/email_verification")
  //   }
  //   catch (err) {
  //     setError(true);
  //   }
  // }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(" + require("./images/loginbg.jpg") + ")",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
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
              <strong>{eText}</strong>
            </Alert>
          </Collapse>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                label="Username"
                name="username"
                defaultValue={state.username}
                onChange={handleChange}
                error={errors.username ? true : false}
                helperText={errors.username}
                onBlur={handleBlur}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Cnic"
                name="cnic"
                defaultValue={state.cnic}
                onChange={handleChange}
                error={errors.cnic ? true : false}
                helperText={errors.cnic}
                onBlur={handleBlur}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Mobile Number"
                name="number"
                defaultValue={state.number}
                onChange={handleChange}
                error={errors.number ? true : false}
                helperText={errors.number}
                onBlur={handleBlur}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email"
                name="email"
                defaultValue={state.email}
                onChange={handleChange}
                error={errors.email ? true : false}
                helperText={errors.email}
                onBlur={handleBlur}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                name="password"
                type="password"
                defaultValue={state.password}
                onChange={handleChange}
                error={errors.password ? true : false}
                helperText={errors.password}
                onBlur={handleBlur}
              />
              <Button
                type="submit"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
                disabled={!isValidForm}
                variant="contained"
                color="primary"
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/login" variant="body2">
                    {"Already have an account? Login Up"}
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
