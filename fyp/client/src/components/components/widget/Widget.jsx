import React, { useContext, useEffect } from "react";
import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import {
  AccountBalanceWalletOutlined,
  MonetizationOnOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { PostContext } from "../../../context/PostContext";
import { Context } from "../../../context/Context";
import { NavLink } from "react-router-dom";
export const Widget = ({ type }) => {
  const { posts } = useContext(PostContext);
  const { user } = useContext(Context);

  useEffect(() => {
  
  }, [user]);
  let data;
  //temp
  const postSize = posts.length;

  const diff = 20;
  switch (type) {
    case "posts":
      data = {
        title: "Posts",
        isPOsts: true,
        link: "See all Posts",
        icon: (
          <PersonOutlineOutlinedIcon
            className="icon"
            style={{ color: "crimson", background: "rgba(255,0,0,0.2)" }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: "See all orders",
        icon: (
          <ShoppingCartOutlined
            className="icon"
            style={{ color: "goldenrod", background: "rgba(218,165,32,0.2)" }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlined
            className="icon"
            style={{ color: "green", background: "rgba(0,128,0,0.2)" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlined
            className="icon"
            style={{ color: "purple", background: "rgba(128,0,128,0.2)" }}
          />
        ),
      };
      break;
    default:
      break;
  }
  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{data.isPOsts ? postSize : null}</span>
        <span className="link"><NavLink to="/AllPosts">{data.link}</NavLink></span>
      </div>
      <div className="right"></div>
    </div>
  );
};
