import { Button, makeStyles } from "@material-ui/core";
import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import BannerBg from "../components/images/bannerimg.jpg";
import m1 from "../components/images/m1.jpg";
import m2 from "../components/images/m2.jpg";

const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplaySpeed: 2000,
    slidesToScroll: 1
  };
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    margin: "64px 0 0",
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
      // flexWrap: "inherit",
      // flexFlow: "row-reverse",
    },
    [theme.breakpoints.down("sm")]: {
      // flexWrap: "wrap",
      // flexFlow: "row-reverse",
    },

    "& .bannercontent": {
      padding: "60px 50px 110px 80px",
      width: "100%",
      [theme.breakpoints.down("md")]: {
        padding: "100px 20px",
      },

      "& .BannerTitle": {
        fontSize: "2.6rem",
        display: " flex",
        alignItems: " flex-start",
        justifyContent: " flex-start",
        flexDirection: "column",
        fontWeight: "700",
        width: "100%",
        lineHeight: " 60px",
        [theme.breakpoints.down("md")]: {
          padding: "0",
          // fontSize: "1.8rem",
        },
        [theme.breakpoints.down("sm")]: {
          fontSize: "1.8rem",
          lineHeight: " 40px",
        },
      },
      "& .BannerDesc": {
        display: " flex",
        alignItems: " flex-start",
        justifyContent: " flex-start",
        textAlign: "left",
        fontWeight: "400",
        lineHeight: " 30px",
        width: "560px",
        padding: "30px 0 40px",
        width: "100%",
        [theme.breakpoints.down("sm")]: {
          fontSize: "1rem",
          lineHeight: " 30px",
        },
      },
    },

    "& .bannerImgp": {
      display: "flex",
      width: "100%",
      "& .bannerImgc": {
        width: "100%",
        height:"500px"
      },
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
    "& .sliders":{
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    }
  },
}));
export const Banner = () => {
  const classes = useStyles();
  return (
    <div>
      <Box className={classes.root}>
        <Box className="bannercontent">
          <Typography className="BannerTitle" variant="h1">
            <span>Helping others is the</span>
            <span>Way We Help</span>
            <span>Ourselves</span>
          </Typography>
          <Typography className="BannerDesc" variant="p">
            We are helping the nation to find their missings
          </Typography>
          <Link to="/create_a_account" style={{ textDecoration: "none" }}>
            <Button variant="contained">Signup Now</Button>
          </Link>
        </Box>
        <Box sx={{width:"60%"}} className="sliders">
        <Slider {...settings} >
          <Box className="bannerImgp" style={{ width: "100%" }}>
            <img className="bannerImgc" src={m1} />
          </Box>
          <Box className="bannerImgp" style={{ width: "100%" }}>
            <img className="bannerImgc" src={m2} />
          </Box>
          <Box className="bannerImgp" style={{ width: "100%" }}>
            <img className="bannerImgc" src={BannerBg} />
          </Box>
        </Slider>
        </Box>
      </Box>
    </div>
  );
};
