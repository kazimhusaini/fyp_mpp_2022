import React from 'react'
import { Navbar } from "../../components/navbar/Navbar"
import { Sidebar } from "../../components/sidebar/Sidebar"
import UpdateProfileForm from '../../UpdateProfileForm'

import "./UpdateProfile.scss"
export const UpdateProfile = () => {
  return (
<div className='UpdateProfile'>
      <Sidebar />
      <div className="UpdateProfileContainer">
        <Navbar />
        <div className="UpdateProfileForm">
        <UpdateProfileForm/>
        </div>
      </div>
    </div>
  )
}
