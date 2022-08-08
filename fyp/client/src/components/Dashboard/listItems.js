import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ChatIcon from '@mui/icons-material/Chat';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Link, NavLink } from 'react-router-dom';
import FeedbackIcon from '@mui/icons-material/Feedback';

export const mainListItems = (

  <React.Fragment>
    <NavLink to="/dash" className="navLink" activeClassName="active" >
      <ListItemButton >
        <ListItemIcon>
          <DashboardIcon  className="navLinkIcon" activeClassName="activenavLinkIcon"/>
        </ListItemIcon>

        <ListItemText primary="Dashboard" />

      </ListItemButton>
    </NavLink>
    <NavLink  to="/PostDash" className="navLink" activeClassName="active">
      <ListItemButton>
        <ListItemIcon>
          <AddBoxIcon />
        </ListItemIcon>
        <ListItemText primary="Post" />
      </ListItemButton>
    </NavLink>
    <NavLink  to="/ChatDashboard" className="navLink" activeClassName="active">
      <ListItemButton>
        <ListItemIcon>
          <ChatIcon />
        </ListItemIcon>
        <ListItemText primary="Chat" />
      </ListItemButton>
    </NavLink>
    <NavLink  to="/FeedBackDash" className="navLink" activeClassName="active">
      <ListItemButton>
        <ListItemIcon>
          <FeedbackIcon />
        </ListItemIcon>
        <ListItemText primary="FeedBack" />
      </ListItemButton>
    </NavLink>
    <NavLink  to="/Help" className="navLink" activeClassName="active">
      <ListItemButton>
        <ListItemIcon>
          <HelpOutlineIcon />
        </ListItemIcon>
        <ListItemText primary="Helps" />
      </ListItemButton>
    </NavLink>

  </React.Fragment>
);
