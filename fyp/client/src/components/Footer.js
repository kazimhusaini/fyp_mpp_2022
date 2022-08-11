import { Box, Container, Divider, Grid, Link } from '@mui/material'
import React from 'react'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import { NavLink } from 'react-router-dom';
export const Footer = () => {
    return (
        <div>
            <Box bgcolor="#fff" color="#000">
                <Container maxWidth="lg" >
                    <Box py={{ xs: 0, sm: 15 }} px={{ xs: 0, sm: 0 }}>
                        <Grid container spacing={5}>
                            {/* <Grid item xs={12} sm={4}> */}
                                {/* <Box sx={{ fontWeight: 'bold' ,padding:"0 0 15px"}}>
                                    About us
                                </Box> */}
                                {/* <Box sx={{padding:"0 0 15px"}}>
                                    <Link sx={{ textDecoration:"none" }} href="/" color="inherit">Portfolio</Link>
                                </Box>
                                <Box sx={{padding:"0 0 15px"}}>
                                    <Link sx={{ textDecoration:"none" }} href="/" color="inherit">Careers</Link>
                                </Box> */}
                                {/* <Box sx={{padding:"0 0 15px"}}>
                                    <Link sx={{ textDecoration:"none" }} href="/contactus" color="inherit">Contact us</Link>
                                </Box>
                            </Grid> */}
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ fontWeight: 'bold' ,padding:"0 0 15px",textDecorationL:"none",color:"#fff"}}>
                                    <NavLink to="contactus">Contact us</NavLink>
                                </Box>
                                <Box sx={{padding:"0 0 15px"}}>
                                    <Link sx={{ textDecoration:"none" }} href="/" color="inherit">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </Link>
                                </Box>
                                <Box sx={{padding:"0 0 15px"}}>
                                    <Link sx={{ textDecoration:"none" }} href="/" color="inherit">+908 89097 890</Link>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ display: 'flex',justifyContent:"space-evenly", alignItems:"end" }}>
                                <Box sx={{padding:"0 0 15px"}}>
                                    <Link sx={{ textDecoration:"none" }} href="/" color="inherit"><FacebookIcon /></Link>
                                </Box>
                                <Box sx={{padding:"0 0 15px"}}>
                                    <Link sx={{ textDecoration:"none" }} href="/" color="inherit"><InstagramIcon /></Link>
                                </Box>
                                <Box sx={{padding:"0 0 15px"}}>
                                    <Link sx={{ textDecoration:"none" }} href="/" color="inherit"><TwitterIcon /></Link>
                                </Box>
                                <Box sx={{padding:"0 0 15px"}}>
                                    <Link sx={{ textDecoration:"none" }} href="/" color="inherit"><LinkedInIcon /></Link>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
                <Divider />
                <Box textAlign="center" pt={{ xs: 2, sm: 3 }} pb={{ xs: 2, sm: 3 }}>
                    Copyright &reg; {new Date().getFullYear()} MPP All rights Rcerved
                </Box>
            </Box>
        </div>
    )
}
