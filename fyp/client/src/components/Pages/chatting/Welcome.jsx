import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Robot from "../../../assets/robot.gif";
import { Context } from "../../../context/Context";
export default function Welcome() {
  const { user, dispatch, isFetching } = useContext(Context);

  const [userName, setUserName] = useState("");
  useEffect(async () => {
    setUserName(user.username);
  }, []);
  return (
    <Container className="welCome">
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #888;
  background-color:#fff;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #888;
  }
`;
