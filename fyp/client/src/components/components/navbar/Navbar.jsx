import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { Avatar, Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../../context/Context";
import {
  sendMessageRoute,
  recieveMessageRoute,
} from "../../../utils/APIRoutes";
import { socket } from "../../../context/SocketContext";
import axios from "axios";
import { makeStyles } from "@material-ui/core";
import {  NavLink } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  navbar: {
    [theme.breakpoints.down("sm")]: {
      height: "58px",
      padding: 0,
    },
  },
}));
export const Navbar = () => {
  const { user } = useContext(Context);
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [fromU, setFromU] = useState("");
  const classes = useStyles();

  useEffect(async () => {
    const data = user;
    const response = await axios.post(recieveMessageRoute, {
      from: data._id,
      // to: currentChat._id,
    });

    setMessages(response.data);
  }, []);
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
        setNotifications((prev) => [...prev, messages]);
        displayNotification(1);
      });
    }
  }, [socket]);

  const displayNotification = ({ senderName, type }) => {
    let action;

    if (type === 1) {
      action = "liked";
    } else if (type === 2) {
      action = "commented";
    } else {
      action = "shared";
    }
    return <span className="notification">{`kk ${action} your post.`}</span>;
  };

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  const handleRead = () => {
    setNotifications([]);
    setOpen(false);
  };
  const PF = "http://localhost:5000/images/";
  return (
    <div className={`${classes.navbar} ${"navbar"}`}>
      <div className="wrapper">
        <div className="items">
          <div className="item">
            {/* <div className="icon" onClick={() => setOpen(!open)}>
              <NotificationsNoneOutlinedIcon className="icon" />
              {
                notifications.length > 0 &&
                <div className="counter">{notifications.length}</div>
              }
            </div> */}
          </div>
          {open && (
            <div className="notifications">
              {notifications.map((n) => displayNotification(n))}
              <button className="nButton" onClick={handleRead}>
                Mark as read
              </button>
            </div>
          )}
          <div className="item">
            {user ? (
              <Avatar alt={user.username} src={PF + user.profilePic} />
            ) : (
              <Avatar />
            )}
          </div>
          <div className="item">
            <NavLink to="/" style={{textDecoration:"none"}}>
              <Button>HomePage</Button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
