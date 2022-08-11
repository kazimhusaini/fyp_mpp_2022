import { Navbar } from "../../components/navbar/Navbar";
import { Sidebar } from "../../components/sidebar/Sidebar";
import SinglePost from "../../components/singlePost/SinglePost";
import "./AllPosts.scss";
import axios from 'axios';
import { useContext, useEffect, useState } from "react";
import Posts from "../../components/posts/Posts";
import { useLocation } from "react-router-dom";
import { Context } from "../../../context/Context";

export default function AllPosts() {
  const { user, dispatch, isFetching } = useContext(Context);
  const { search } = useLocation();
  useEffect(() => {
  }, [search]);
  return (
    <>
      {user ?
        <div className='AllPosts'>
          <Sidebar />
          <div className="AllPostsContainer">
            <Navbar />
            <div className="AllPostsForm">
              <h2>All Posts</h2>
              <Posts  />
            </div>
          </div>
        </div>
        :
        <Posts/>
      }
    </>
  );
}
