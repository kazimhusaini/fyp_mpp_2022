import { Alert, AlertTitle, Paper } from '@mui/material'
import React from 'react'
import "./verifyEmail.css"
export const VerifyEmail = () => {
  return (
    <div className='verifyEmail'>
      <Alert severity="info" sx={{ width: '60%' }}>
        <AlertTitle>Please Verify Your Email</AlertTitle>
        We Send Verification Link in Your <strong>Account</strong>
      </Alert>
    </div>

  )
}
