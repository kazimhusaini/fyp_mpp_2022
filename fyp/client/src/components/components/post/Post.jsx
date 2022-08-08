import "./post.css";
import { Link } from "react-router-dom";
import { Button } from '@mui/material';

export default function Post({ post }) {
  const PF = "http://localhost:5000/images/";
  return (
    <>
      <div class="user-card">
        <span class="avatar-holder">
          <img src={PF + post.photo} />
        </span>
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
                <Button sx={{margin:"10px 0 0"}} variant="contained" className=''>See More</Button>
                </Link>
              </span>
        </span>
      </div>

    </>


  );
}