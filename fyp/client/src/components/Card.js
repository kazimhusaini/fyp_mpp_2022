import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import cardImg from "./images/loginbg.jpg"
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Cards({ post }) {
  const PF = "http://localhost:5000/images/";

  return (
    <Link to={`/post/${post._id}`} className="link" style={{ textDecoration: "none" }}>
      <Card sx={{ width: "290px" }} className='slideCardImg'>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200px"
            width="100% !important"
            image={PF + post.photo}
            alt=""

          />
          <CardContent>
            <span class="user-info-holder">
              <h2 class="name">{post.firstname} {post.lastname}</h2>
              <span class="desc">
                <p>{post.city}</p>
                <p>{post.age}</p>
                <p>{new Date(post.missingDate).toDateString()}</p>
              </span>
              <span class="desc">
                <p>{post.description}</p>
              </span>

              <span class="button">
                <Link to={`/post/${post._id}`} className="slbtn">
                <Button sx={{margin:"10px 0 0"}} variant="contained" className=''>View</Button>
                </Link>
              </span>
            </span>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
