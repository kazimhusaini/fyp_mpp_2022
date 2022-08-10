import React, { useContext, useState, useEffect, createContext } from "react";
import axios from "axios";

export const PostContext = createContext();

export function PostContextProvider({ children }) {
  const [posts, setPosts] = useState([null]);
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
  return (
    <PostContext.Provider
      value={{
        posts
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
