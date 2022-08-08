import React from 'react'
import "./widget.scss"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { AccountBalanceWalletOutlined, MonetizationOnOutlined, ShoppingCartOutlined } from '@mui/icons-material';
export const Widget = ({ type }) => {
  let data;
  //temp
  const amount = 100;
  const diff = 20;
  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        icon: (
          <PersonOutlineOutlinedIcon className='icon' style={{ color: "crimson", background: "rgba(255,0,0,0.2)" }} />
        )
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: "See all orders",
        icon: (
          <ShoppingCartOutlined className='icon' style={{ color: "goldenrod", background: "rgba(218,165,32,0.2)" }} />
        )
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlined className='icon' style={{ color: "green", background: "rgba(0,128,0,0.2)" }} />
        )
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlined className='icon' style={{ color: "purple", background: "rgba(128,0,128,0.2)" }} />
        )
      };
      break;
    default:
      break;
  };
  return (
    <div className='widget'>
      <div className="left">
        <span className="title">
          {data.title}
        </span>
        <span className="counter">
          {data.isMoney && "$"} {amount}
        </span>
        <span className="link">
          {data.link}
        </span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  )
}
