import React, { useContext, useEffect, useState } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Paper, Button, Box, Typography } from '@mui/material'
import { Card, Container, makeStyles } from '@material-ui/core';
import Cards from './Card';
import { Context } from '../context/Context';
import axios from "axios"

const useStyles = makeStyles(theme => ({

    Space: {
        margin: "100px 0",
    },
    mSLIDER: {
        display: "flex",
        padding: "20px",

    },
    SliderTitle: {
        display: "flex",
        textAlign: "center",
        fontSize: "33px !important",
        fontWeight: "bold !important",
        margin: "20px 0 0 !important",
    }
}))
export function MSlider(props) {
    const classes = useStyles();

    const { user, dispatch, isFetching } = useContext(Context);
    const PF = "http://localhost:5000/images/";
    const [posts, setPosts] = useState([]);
    // const { search } = useLocation();
    // const [id, setId] = useState(null);
    useEffect(() => {
        const fecthData = async () => {
            await axios.get("/posts")
                .then(res => {
                    setPosts(res.data);
                });
        };
        fecthData();
    }, []);
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };
    return (
        <div className={classes.Space}>
            <Container>
                <Box>  <Typography className={classes.SliderTitle} variant='h2' >Have You Seen Me?</Typography></Box>
                <Carousel responsive={responsive}>
                    {
                        posts.length > 0 ? (
                            posts && posts.map((p, index) => {
                                return (
                                    <Box className={classes.mSLIDER}>
                                        <Cards post={p} />
                                    </Box>

                                )
                            })
                        ) : (<h3></h3>)
                    }

                </Carousel>
            </Container>
        </div>
    )
}

// function Item(props) {
//     const classes = useStyles();
//     return (
//         <Box className={classes.mSLIDER}>
//             <Cards name={props.item.firstname} description={props.item.description} />
//         </Box>
//     )
// }