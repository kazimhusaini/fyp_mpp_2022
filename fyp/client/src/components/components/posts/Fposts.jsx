import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LinearIndeterminate from "../../Linearbar";
import UploadImage from "../../UploadImage";
import Post from "../post/Post";
import "./posts.css";
import axios from "axios";
import Fpost from "../post/Fpost";
export default function Fposts({ posts }) {
  const [loading, setLoading] = useState(false);
  //   const [posts, setPosts] = useState([]);
  //   const { search } = useLocation();
  //   useEffect(() => {
  //     const fetchPosts = async () => {
  //       try {
  //         const res = await axios.get("/posts" + search);
  //         setPosts(res.data);
  //         setLoading(false);
  //       }
  //       catch (err) {
  //         console.log(err, "err");
  //         setLoading(false)
  //       }

  //     };
  //     fetchPosts();
  //   }, [search]);
  return (
    <div className="posts">
      <div
        className=""
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "flex",
          zIndex: 9,
          width: "100%",
        }}
      >
        {loading ? <LinearIndeterminate /> : null}
      </div>

      {posts.length > 0 ? (
        posts &&
        posts.map((p, index) => {
          return (
            <>
              <Fpost post={p} />
            </>
          );
        })
      ) : (
        <h3
         className="notFound"
        >
          Post was not found
        </h3>
      )}
    </div>
  );
}
