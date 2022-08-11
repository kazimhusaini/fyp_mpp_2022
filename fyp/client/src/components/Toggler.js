import React from 'react'
import { func, string } from 'prop-types';
import styled from "styled-components"
import NightsStayOutlinedIcon from '@mui/icons-material/NightsStayOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import { makeStyles } from '@material-ui/core';
import { Tooltip } from '@mui/material';
const Button = styled.button`
  -webkit-box-shadow: 0 0 5px 1px #FFFFFF;
  box-shadow: 0 0 5px 1px #FFFFFF;
  border-radius: 30px;
  cursor: pointer;
  font-size: 0.5rem;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin: 0 auto;
  overflow: hidden;
  padding: 0.5rem;
  position: relative;
  width: 50px;
  height: 50px;
  outline: none;
  background: #fff;
  position: fixed;
  botton: 0;
  top: 70px;
  padding: 5px;
  right: 2px;
  z-index: 99999;
  }

`;
const useStyles = makeStyles(theme => ({
  sun: {
    // backgroundColor:"yellow",
    // borderRadius:"50%",
    // padding:"5px"
  },
  toggleBtn: {
    position: "fixed ",
    top: "10px",
    right: "15px",
    borderRadius: "50%",
    padding: "10px",
    [theme.breakpoints.down("sm")]: {
      width: "35px  !important",
      height: "35px  !important",
      top: " 19px  !important",
      right: " 19px !important ",
      padding:"0 !important ",
    }
  }
}))
const Toggle = ({ theme, toggleTheme }) => {

  const classes = useStyles();
  return (
    <Button onClick={toggleTheme} className={`${classes.toggleBtn} ${"toggleBtn"}`} style={{}}>
      {theme === "light" ?
        <Tooltip title="Lights Off" style={{ zIndex: "9999 !important" }}>
          <NightsStayOutlinedIcon />
        </Tooltip>
        :
        <Tooltip title="Lights On">
          <WbSunnyOutlinedIcon style={{ zIndex: "9999 !important" }} className={classes.sun} />
        </Tooltip>

      }
    </Button>
  );
};

Toggle.propTypes = {
  theme: string.isRequired,
  toggleTheme: func.isRequired,
}

export default Toggle;