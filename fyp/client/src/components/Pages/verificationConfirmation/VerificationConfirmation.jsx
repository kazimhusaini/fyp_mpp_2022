import { Alert, AlertTitle, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import "./verificationConfirmation.css"
import axios from "axios"
import { Link } from 'react-router-dom'
export const VerificationConfirmation = () => {
  const [ResM, setResM] = useState();
  // const { search } = useLocation();
  // const [id, setId] = useState(null);
  useEffect(() => {
    // const fecthData = async () => {
    //   await axios.get("http://localhost:5000/api/auth/verify_email")
    //     .then(res => {
    //       setResM(res.data);
    //       console.log(ResM);
    //     });
    // };
    // fecthData();
  }, []);
  return (
    <div className='verificationConfirmation'>
      {/* <Paper className='verificationConfirmationPaper' variant="outlined" >

        <h1>
          confirm
        </h1>
        <p>Please Verify your Email ,We Send Verfication Link in your Email</p>
      </Paper> */}
      <Alert severity="success" sx={{width: '60%'}}>
        <AlertTitle>Your Email Successfully Verified</AlertTitle>
       Click Here <strong><Link to="/login" style={{  color:"rgb(30, 70, 32)"}}>Login</Link></strong>
      </Alert>
    </div>

  )
}
