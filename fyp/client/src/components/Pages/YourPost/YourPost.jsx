
import { Navbar } from "../../components/navbar/Navbar";
import { Sidebar } from "../../components/sidebar/Sidebar";
import SinglePost from "../../components/singlePost/SinglePost";
import "./YourPost.scss";
import axios from 'axios';
import { useContext, useEffect, useState } from "react";
import Posts from "../../components/posts/Posts";
import { useLocation } from "react-router-dom";
import { Context } from "../../../context/Context";
import Post from "../../components/post/Post";
import LinearIndeterminate from "../../Linearbar";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  YourPost: {
    "& .YourPostForm":{
      [theme.breakpoints.down("sm")]: {
        padding: "10px !important",
      },
    }
  },
  ".posts":{
    display:"none",
  }
}))
export default function YourPost() {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const classes = useStyles();
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/posts" + search);
        setPosts(res.data);
        setLoading(false);
      }
      catch (err) {
        console.log(err, "err");
        setLoading(false)
      }

    };
    fetchPosts();
  }, [search]);
  return (
    <div className={`${classes.YourPost} ${"YourPost"}`}>
      <Sidebar />
      <div className="YourPostContainer">
        <Navbar />
        <div className="YourPostForm">
          <div className="posts">
            {loading && loading ?
              <div className="" style={{ position: "absolute", top: 0, left: 0, display: "flex", zIndex: 9, width: "100%" }} >
                <LinearIndeterminate /></div> : null
            }
            {
              posts.length > 0 ? (

                posts && posts.map((p, index) => {
                  return (
                    p.username === user.username ? (
                      <Post post={p} />
                    ) : (<h3> Nothing posted yet</h3>)

                  )
                })

              ) : (null)
            }
          </div>
        </div>
      </div>
    </div>
  );
}
