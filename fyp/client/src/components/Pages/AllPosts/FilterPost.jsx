// import { Navbar } from "../../components/navbar/Navbar";
import { Navbar } from "../../components/navbar/Navbar";
import { Sidebar } from "../../components/sidebar/Sidebar";
import SinglePost from "../../components/singlePost/SinglePost";
import "./AllPosts.scss";
import axios from 'axios';
import { useContext, useEffect, useState } from "react";
import Posts from "../../components/posts/Posts";
import { useLocation, useParams } from "react-router-dom";
import { Context } from "../../../context/Context";
import Fposts from "../../components/posts/Fposts";

export default function FilterPost() {
  const { user, dispatch, isFetching } = useContext(Context);
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const {firstname,lastname,city,missingAge,missingDate,ageType,gender} = useParams();
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`/posts/missingFilter/${firstname}/${lastname}/${city}/${missingAge}/${missingDate}/${ageType}/${gender}/` );
      setPosts(res.data);
      console.log(res.data);
    };

    fetchPosts();
  }, [search]);
  return (
    <>
      {user ?
        <div className='AllPosts'>
          <Sidebar />
          <div className="AllPostsContainer">
            <Navbar />
            <div className="AllPostsForm">
              <Fposts posts={posts} />
            </div>
          </div>
        </div>

        :
        <Fposts posts={posts} />
      }
    </>
  );
}
