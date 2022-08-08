import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Dashboard from "./components/Dashboard/Dashboard";
import { HomePage } from "./components/HomePage";
import PostDash from "./components/Dashboard/PostDash";
import { Help } from "./components/Dashboard/Help";
import ChatDashboard from "./components/Dashboard/ChatDashboard";
import { FeedBackDash } from "./components/Dashboard/FeedBackDash";
import { useContext, useEffect, useState } from "react";
import { Context } from "./context/Context";
import { Home } from "./components/Pages/Home/Home";
import { GeneratePost } from "./components/Pages/GeneratePost/GeneratePost";
import { ChatDash } from "./components/Pages/Chat/ChatDash";

import { List } from "./components/Pages/list/List";
import { DarkModeContext } from "./context/darkModeContext";
import { UpdateProfileForm } from "./components/UpdateProfileForm";
import { UpdateProfile } from "./components/Pages/UpdateProfile/UpdateProfile";
import Single from "./components/Pages/single/Single";
import Write from "./components/Pages/write/Write";
import AllPosts from "./components/Pages/AllPosts/AllPosts";
import YourPost from "./components/Pages/YourPost/YourPost";
import UploadImage from "./components/UploadImage";
import Match from "./components/Pages/imageMatch/Match";
import { VerifyEmail } from "./components/Pages/verifyEmail/VerifyEmail";
import { VerificationConfirmation } from "./components/Pages/verificationConfirmation/VerificationConfirmation";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import FilterPost from "./components/Pages/AllPosts/FilterPost";
import BarLoader from "react-spinners/BarLoader";
import axios from "axios";
import { Alert, Collapse, IconButton } from "@mui/material";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./components/Themes";
import AlertTitle from "@mui/material/AlertTitle";
import CloseIcon from "@mui/icons-material/Close";
import Chat from "./Chat";
import SetAvatar from "./components/Pages/chatting/SetAvatar";
import { notiContext } from "./context/Notifications";
import { Navbar } from "./components/components/navbar/Navbar";
import Header from "./components/AppBar";
import "./style/dark.scss";
import { useDarkMode } from "./context/useDarkMode";
import { GlobalStyles } from "./components/Globalstyle";
import Toggle from "./components/Toggler";
import { makeStyles } from "@material-ui/core";
import { ContactUs } from "./components/Pages/ContactUs/ContactUs";
const useStyles = makeStyles((theme) => ({
  globeCss: {
    "& .posts": {
      [theme.breakpoints.down("sm")]: {
        padding: "0 !important",
        margin: 0,
      },
    },
    "& .user-card": {
      [theme.breakpoints.down("sm")]: {
        padding: "20px !important",
        margin: "10px",
        width: "265px",
      },
      "& .avatar-holder img": {
        [theme.breakpoints.down("sm")]: {
          height: "150px",
          objectFit: "unset",
        },
      },
    },
    "& .AllPostsForm": {
      [theme.breakpoints.down("sm")]: {
        padding: "10px !important",
      },
    },
    "& .MatchForm": {
      [theme.breakpoints.down("sm")]: {
        padding: "0 !important",
      },
      "& .css-1oqqzyl-MuiContainer-root": {
        [theme.breakpoints.down("sm")]: {
          padding: "0 !important",
        },
      },
    },
  },
}));
function App() {
  const classes = useStyles();

  const { user, dispatch, isFetching } = useContext(Context);
  const { noti } = useContext(notiContext);

  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#000");
  let [test, setTest] = useState("");
  const [sessionExpire, setSessionExpire] = useState("");
  const [openSE, setOpenSE] = useState(false);
  const [theme, themeToggler, mountedComponent] = useDarkMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;
  useEffect(() => {
    const fecthData = async () => {
      try {
        const res = await axios({
          method: "POST",
          url: "/auth/dash/",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setLoading(false);
      } catch (err) {
        dispatch({ type: "LOGOUT" });
        setSessionExpire("Session is Expire, Please Login Again");
        setOpenSE(true);
        setLoading(false);
        console.log("Session is Expire, Please Login Again");
      }
    };
    fecthData();
  }, []);
  return (
    <div className={`${classes.globeCss} ${"globeCss"}`}>
      <ThemeProvider theme={themeMode}>
        <GlobalStyles />
        <div className="App">
          <Toggle theme={theme} toggleTheme={themeToggler} />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/posts" element={user ? <PostDash /> : <Signin />} />
              <Route path="login" element={user ? <HomePage /> : <Signin />} />
              <Route path="forgot_password" element={<ForgotPassword />} />
              <Route
                path="/passwordreset/:resetToken"
                element={<ResetPassword />}
              />
              <Route
                path="create_a_account"
                element={user ? <HomePage /> : <Signup />}
              />
              <Route
                path="dash"
                element={
                  user ? (
                    <Home />
                  ) : (
                    <Signin
                      sessionExpire={sessionExpire}
                      openSE={openSE}
                      setOpenSE={setOpenSE}
                    />
                  )
                }
              />
              <Route
                path="updateprofile"
                element={user ? <UpdateProfile /> : <Signin />}
              />
              <Route path="/post/:id" element={<Single />}>
                {" "}
              </Route>
              <Route
                path="GeneratePost"
                element={user ? <GeneratePost /> : <Signin />}
              ></Route>
              <Route path="AllPosts" element={<AllPosts />}></Route>
              <Route
                path="filterpost/:firstname/:lastname/:city/:missingAge/:missingDate/:ageType/:gender"
                element={<FilterPost />}
              ></Route>
              <Route
                path="YourPost"
                element={user ? <YourPost /> : <Signin />}
              ></Route>
              <Route
                path="image_matching"
                element={user ? <Match /> : <Signin />}
              ></Route>
              <Route
                path="email_verification"
                element={<VerifyEmail />}
              ></Route>
              <Route
                path="verificationConfirmation"
                element={<VerificationConfirmation />}
              ></Route>
              <Route path="chat" element={<ChatDash />}></Route>
              <Route path="setAvatar" element={<Navbar noti={noti} />}></Route>
              <Route path="contactus" element={<ContactUs />}></Route>
            </Routes>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
