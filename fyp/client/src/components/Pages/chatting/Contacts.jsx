import { Avatar } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Logo from "../../../assets/logo.svg";
import { Context } from "../../../context/Context";
import ScaleLoader from "react-spinners/ScaleLoader";

export default function Contacts({ contacts, changeChat, show, setShow }) {
  const { user, dispatch, isFetching } = useContext(Context);

  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  let [color, setColor] = useState("#1090CB");

  const PF = "http://localhost:5000/images/";

  useEffect(async () => {
    const data = user;
    setCurrentUserName(data.username);
    setCurrentUserImage(PF + data.profilePic);
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container className="chatCont">
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>Mpp</h3>
          </div>
          <div className="contacts" style={{ position: "relative" }}>
            {show && show ? <Pre> <ScaleLoader
              className="scalerLoader"
              size={30}
              color={color} /></Pre> : null}
            {
              contacts ? (contacts.map((contact, index) => {
                return (
                  <div
                    key={contact._id}
                    className={`contact ${index === currentSelected ? "selected" : ""
                      }`}
                    onClick={() => changeCurrentChat(index, contact)}
                  >
                    <Avatar src={PF + contact.profilePic} alt="" />
                    <div className="username">
                      <h3>{contact.username}</h3>
                    </div>
                  </div>
                );
              })) : null
            }
          </div>
          <div className="current-user">
            <Avatar src={currentUserImage} alt="image" />
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  overflow: hidden;
  border-right: 0.5px solid #76767637;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    background-color:#fff;
    border-bottom: 0.5px solid #76767637;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: #888;
      text-transform: uppercase;
      font-size:18px;
      font-weight:400
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    background-color:#fff;
    align-items: center;
    padding:10px 0;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #F9F6EE;
      min-height: 5rem;
      cursor: pointer;
      width: 100%;
      border-radius: 0.2rem;
      padding: 0.4rem 1rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
        }
      }
      .username {
        h3 {
          color: #888;
          font-size:18px;
          font-weight:400
        }
      }
    }
    .selected {
      background-color: #EDEADE;
    }
  }

  .current-user {
    background-color: #fff;
    border-top: 0.5px solid #76767637;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    .avatar {
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
      }
    }
    .username {
      h2 {
        color: #888;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 0.8rem;
        }
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