import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Context } from "../context/Context";
import { Link, NavLink } from "react-router-dom";
import Toggle from "./Toggler";

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];

function Header(props) {
  const { user, dispatch, isFetching } = React.useContext(Context);

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
  };
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography className="logoTitle" variant="h1" sx={{ my: 2 }}>
        Missing Person Portal
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box className="btnholder">
        {user ? (
          <>
            <Link
              style={{ textDecoration: "none", margin: " 0 10px" }}
              className="slbtn"
              to="dash"
            >
              {" "}
              <Button variant="outlined">Dashboard</Button>
            </Link>
            <Button
              style={{ margin: " 0 0 0 10px " }}
              variant="contained"
              onClick={handleLogout}
            >
              {user && "LOGOUT"}
            </Button>
          </>
        ) : (
          <>
            <Link
              style={{ textDecoration: "none", margin: " 0 0 0 10px " }}
              className="slbtn"
              to="login"
            >
              {" "}
              <Button variant="outlined">SIGN IN</Button>
            </Link>
            <Link
              style={{ textDecoration: "none", margin: " 0 0 0 10px " }}
              className="slbtn"
              to="create_a_account"
            >
              {" "}
              <Button variant="contained">SIGN UP</Button>
            </Link>
          </>
        )}
      </Box>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        component="nav"
        style={{ backgroundColor: "#fff" }}
        className="appBarc"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
            <Typography
              className="logoTitle"
              variant="h1"
              component="div"
              sx={{ margin: "0 0 0 10px " }}
            >
              Missing Person Portal
            </Typography>
          </IconButton>
          <Typography
            className="logoTitle"
            variant="h1"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Missing Person Portal
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {/* {navItems.map((item) => (
              <a className='navText' key={item} style={{ color: '#fff' ,margin:"0 10px"}}>
                {item}
              </a>
            ))} */}
            <NavLink
              to="/"
              className="navText"
              style={{ color: "#fff", margin: "0 10px" }}
            >
              Home
            </NavLink>
            <a
              href="#contact"
              className="navText"
              style={{
                color: "#fff",
                margin: "0 10px",
                textDecoration: "none",
              }}
            >
              Contact
            </a>
          </Box>
          <Box
            className="btnholder"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            {user ? (
              <>
                <Link
                  style={{ textDecoration: "none", margin: " 0 0 0 10px " }}
                  className="slbtn"
                  to="dash"
                >
                  {" "}
                  <Button variant="outlined">Dashboard</Button>
                </Link>
                <Button
                  style={{ margin: " 0 0 0 10px " }}
                  variant="contained"
                  onClick={handleLogout}
                >
                  {user && "LOGOUT"}
                </Button>
              </>
            ) : (
              <>
                <Link
                  style={{ textDecoration: "none", margin: " 0 0 0 10px " }}
                  className="slbtn"
                  to="login"
                >
                  {" "}
                  <Button variant="outlined"> SIGN IN</Button>
                </Link>
                <Link
                  style={{ textDecoration: "none", margin: " 0 0 0 10px " }}
                  className="slbtn"
                  to="create_a_account"
                >
                  {" "}
                  <Button variant="contained"> SIGN UP</Button>
                </Link>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          className="MainPageSideBar"
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, 
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

Header.propTypes = {
  window: PropTypes.func,
};

export default Header;
