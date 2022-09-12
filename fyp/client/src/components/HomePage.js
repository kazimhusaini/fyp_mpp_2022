import React from "react";
// import AppBar from '@mui/material/AppBar';
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { makeStyles } from "@material-ui/core";
import UploadImage from "./UploadImage";
import { FilterContent } from "./FilterContent";
import { Divider } from "@mui/material";
import { Banner } from "./Banner";
import { MSlider } from "./MSlider";
import { Footer } from "./Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext, useRef } from "react";
import { Context } from "../context/Context";
import Header from "./AppBar";
import { ContactUs } from "./Pages/ContactUs/ContactUs";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .htoolbar": {
      backgroundColor: "#fff",
      display: "flex",
      justifyContent: "space-between",
      "& .slbtn": {
        textDecoration: "none",
      },

      "& .nav": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 20,
        "& .home": {
          color: "#000",
          fontSize: "16px",
          display: "block",
        },
      },
      "& .btnholder": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "20px",
      },
    },
  },
}));

export const HomePage = () => {
  const classes = useStyles();

  const { user, dispatch, isFetching } = useContext(Context);

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div>
      <Box className={classes.root}>
        <Header />
      </Box>
      <Banner />
      <Divider />
      <UploadImage />
      <Divider />
      <FilterContent />
      <Divider />
      <MSlider />
      <Divider />
      <ContactUs />
      <Divider />
      <Footer />
    </div>
  );
};
