import { Button, makeStyles } from '@material-ui/core'
import { Box, Typography } from '@mui/material'
import React from 'react'
import BannerBg from '../components/images/bannerimg.jpg'
const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        padding:"0  0 70px 0",
        width:"100%",
        margin:"64px 0 0",
        [theme.breakpoints.down("md")]: {
            justifyContent: "center",
            flexWrap:"inherit",
            flexFlow: "row-reverse",
        },
        [theme.breakpoints.down("sm")]: {
            flexWrap:"wrap",
            flexFlow: "row-reverse",
        },

        '& .bannercontent': {
            padding: "100px 50px 110px 123px",
            width:"100%",
            [theme.breakpoints.down("md")]: {
                padding: "100px 20px",
        
            },
        
            '& .BannerTitle': {
                fontSize: "2.6rem",
                display: " flex",
                alignItems: " flex-start",
                justifyContent: " flex-start",
                flexDirection: "column",
                fontWeight: "700",
                width:"100%",
                lineHeight: " 60px",
                [theme.breakpoints.down("md")]: {
                    padding:"0",
                    // fontSize: "1.8rem",
                },
                [theme.breakpoints.down("sm")]: {
                    fontSize: "1.8rem",
                    lineHeight: " 40px",
                },
            },
            '& .BannerDesc':{
                display: " flex",
                alignItems: " flex-start",
                justifyContent: " flex-start",
                textAlign:"left",             
                fontWeight: "400",
                lineHeight: " 30px",
                width:"560px",
                padding:"30px 0 40px",
                width:"100%",
                [theme.breakpoints.down("sm")]: {
                    fontSize: "1rem",
                    lineHeight: " 30px",
                },
            }
        },

        '& .bannerImgp': {
            display: "flex",
            width: "100%",
            '& .bannerImgc': {
                width: "100%",
            },
            [theme.breakpoints.down("sm")]: {
                display:"none"
            },
        }
    }

}))
export const Banner = () => {
    const classes = useStyles();
    return (
        <div>
            <Box className={classes.root}>
                <Box className='bannercontent'>
                    <Typography className="BannerTitle" variant='h1' >
                        <span>Helping others is the</span>
                        <span>Way We Help</span>
                        <span>Ourselves</span>
                    </Typography>
                    <Typography className="BannerDesc" variant='p' >
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </Typography>
                    <Button variant="contained">Explore Now</Button>
                </Box>
                <Box className="bannerImgp" >
                    <img className="bannerImgc" src={BannerBg} />
                </Box>
            </Box>
        </div>
    )
}
