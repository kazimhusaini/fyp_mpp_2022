import { makeStyles } from '@material-ui/core'
import React from 'react'
import { Navbar } from "../../components/navbar/Navbar"
import { Sidebar } from "../../components/sidebar/Sidebar"
import AddressForm from '../../Dashboard/AddressForm'
import "./GeneratePost.scss"
const useStyles = makeStyles(theme => ({
  GeneratePost: {
    "& .GeneratePostForm":{
      [theme.breakpoints.down("sm")]: {
        padding: "30px !important",
      },
    }
  },
}))
export const GeneratePost = () => {
  const classes = useStyles();
  return (
    <div className={`${classes.GeneratePost} ${"GeneratePost"}`}>
      <Sidebar />
      <div className="GeneratePostContainer">
        <Navbar />
        <div className="GeneratePostForm">
          <AddressForm />
        </div>
      </div>
    </div>
  )
}
