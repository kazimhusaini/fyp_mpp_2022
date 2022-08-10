import React, { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import {
  sendMessageRoute,
  recieveMessageRoute,
} from "../../../utils/APIRoutes";
import { Context } from "../../../context/Context";
import Contacts from "./Contacts";
import { Avatar } from "@mui/material";
import ScaleLoader from "react-spinners/ScaleLoader";
import { socket } from "../../../context/SocketContext";
export default function ChatContainer({ currentChat }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const { user, dispatch, isFetching } = useContext(Context);
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  let [color, setColor] = useState("#1090CB");
  const PF = "http://localhost:5000/images/";
  const [getSendMessage, setGetSendMessage] = useState("");

  const sendEmail = async (e) => {
    e.preventDefault();
    console.log(username);

  };
  useEffect(async () => {
    const data = user;

    const response = await axios.post(recieveMessageRoute, {
      from: data._id,
      to: currentChat._id,
    });
    setMessages(response.data);
    if (response.data) {
      setShow(false);
    }
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        user._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const [liked, setLiked] = useState(false);

  const handleSendMsg = async (msg) => {
    const data = user;
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  

    const newPost = {
      username:user.username,
      message:msg,
      emailTo:currentChat.email,
      fromEmail: user.email,
    };
    try {
      const res = await axios.post("/posts/sentToMail", newPost);
      console.log("email sent");
      setOpen(true)
    } catch (err) {
      if (err.response.data) {
        console.log(err.response.data);
      }
    }
  };

  useEffect(async () => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
        setNotifications((prev) => [...prev, messages]);
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleRead = () => {
    setNotifications([]);
    setOpen(false);
  };

  return (
    <Container className="chatContainerr">
      <div className="chat-header">
        <div className="user-details">
          <Avatar src={PF + currentChat.profilePic} alt="" />
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
      </div>
      <div className="chat-messages" style={{ position: "relative" }}>
        {show && show ? (
          <Pre>
            {" "}
            <ScaleLoader className="scalerLoader" size={30} color={color} />
          </Pre>
        ) : null}
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message.message} </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    // grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    border-bottom: 0.5px solid #76767637;

    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
      }
      .username {
        h3 {
          color: #888;
          font-size: 18px;
          font-weight: 400;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 0 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #888;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #00b2ff;
        color: #fff;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: white;
        border: 0.5px solid #80808080;
        color: #000;
      }
    }
  }
`;

const Pre = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  right: 0;
  bottom: 0;
  margin: auto;
  background: #000;
  display: flex;
  opacity: 60%;
`;
