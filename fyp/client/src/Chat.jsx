import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "./utils/APIRoutes";
import ChatContainer from "./components/Pages/chatting/ChatContainer";
import Contacts from "./components/Pages/chatting/Contacts";
import Welcome from "./components/Pages/chatting/Welcome";
import { Context } from "./context/Context";
import { notiContext } from "./context/Notifications";
import { socket } from "./context/SocketContext";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({

}))
export default function Chat() {
  const navigate = useNavigate();
  const { dispatch2, noti } = useContext(notiContext);

  // const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const { user, dispatch, isFetching } = useContext(Context);
  const [show, setShow] = useState(true);
  const classes = useStyles();


  useEffect(async () => {
    if (!user) {
      navigate("/login");
    } else {
      setCurrentUser(user);
    }

  }, []);
  useEffect(() => {
    if (currentUser) {
      // dispatch2({ type: "NOTI_START" });
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
      // dispatch2({ type: "NOTI_SUCCESS", payload: socket });
      socket.on("someEvent", data => {
        console.log(`I can now do something with ${data}`);
      });
    }

    // else{
    //   dispatch2({ type: "NOTI_FAILURE" });

    // }
  }, [currentUser]);

  useEffect(async () => {
    if (currentUser) {
      const data = await axios.post(`/users/user/getfriend`, {
        "requestor": user.email
      });
      setContacts(data.data.friends);
      setShow(false)

    }
  }, [currentUser]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <>
      <Container className={classes.root}>
        <div className="container cont">  
          <Contacts contacts={contacts} changeChat={handleChatChange} setShow={setShow} show={show} />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  // height: 100vh;
  // width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // gap: 1rem;
  margin:20px 0 ;
  align-items: center;
  // background-color: #fff;
  // box-shadow: 0px 0px 10px #80808080;
  .container {
    height: 85vh;
    width: 85vw;
    border: 1px solid gray;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
