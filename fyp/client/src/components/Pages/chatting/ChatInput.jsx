import React, { useState } from "react";
// import { BsEmojiSmileFill } from "react-icons/bs";
// import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
// import Picker from "emoji-picker-react";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  // const handleEmojiPickerhideShow = () => {
  //   setShowEmojiPicker(!showEmojiPicker);
  // };

  // const handleEmojiClick = (event, emojiObject) => {
  //   let message = msg;
  //   message += emojiObject.emoji;
  //   setMsg(message);
  // };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container className="typeText">
      <form className="input-container " onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="Type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          Send
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0 2rem;
  border-top: 0.5px solid #76767637;

  padding: 20px;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    font-size:16px;
    font-weight:400
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #fff;
    input {
      width: 100%;
      height: 60%;
      background-color: transparent;
      color: #888;
      padding:5px;
      border: 0;
      border-bottom: 1px solid #76767637;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
      &::placeholder {
        color:#888;
        font-size:16px;
        font-weight:400
        margin:5px;
      }
    }
    button {
      padding: 10px 40px;
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #00B2FF;
      border: none;
      color:#fff;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;
