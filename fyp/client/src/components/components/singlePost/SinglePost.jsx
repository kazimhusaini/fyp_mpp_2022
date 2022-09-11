import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../../context/Context";
import "./singlePost.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import ChatIcon from "@mui/icons-material/Chat";
import { Box, Button, Container } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

// import Chat from "../../Pages/Chat";
// import io from 'socket.io-client'
// import { Chat } from "../Chat";
// const socket = io.connect("http://localhost:5000")

const useStyles = makeStyles((theme) => ({}));

export default function SinglePost() {
  let navigate = useNavigate();

  const location = useLocation();
  const classes = useStyles();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "http://localhost:5000/images/";
  const [updateMode, setUpdateMode] = useState(false);
  const { user } = useContext(Context);
  const [firstname, setFirstname] = useState("");
  const [description, setDescription] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [missingAge, setMissingAge] = useState("");
  const [gender, setGender] = useState("");
  const [ageType, setAgeType] = useState("");
  const [missingDate, setMissingDate] = useState("");
  const [role, setRole] = useState("");
  const [num, setNum] = useState("");

  const [username, setUsername] = useState("");
  const [senderId, setsenderId] = useState(null);
  const [room, setRoom] = useState("");
  const [file, setFile] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [uphoto, setUPhoto] = useState("");
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setUPhoto(res.data.photo);
      setFirstname(res.data.firstname);
      setLastname(res.data.lastname);
      setAddress(res.data.address);
      setCity(res.data.city);
      setGender(res.data.gender);
      setAgeType(res.data.ageType);
      setMissingAge(res.data.missingAge);
      setMissingDate(res.data.missingDate);
      setRole(res.data.role);
      setDescription(res.data.description);
      setNum(res.data.number);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      navigate("/AllPosts");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    const updatePost = {
      username: user.username,
      email: user.email,
      firstname,
      lastname,
      address,
      city,
      missingAge,
      gender,
      ageType,
      missingDate,
      role,
      description,
      num,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatePost.photo = filename;
      setUPhoto(filename);
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      await axios.put(`/posts/${post._id}`, updatePost);
      setUpdateMode(false);
    } catch (err) {}
  };
  const handleChat = async () => {
    try {
      const res = await axios.post("/users/user/addfriend/", {
        requestor: user.email,
        target: post.email,
      });
      window.location.replace("/chat");
    } catch (err) {
      console.log(err.response.data);
      window.location.replace("/chat");
    }
  };

  return (
    <Container>
      <div className="singlePost">
        <div className="singlePostWrapper">
          {uphoto &&
            (updateMode ? (
              <Box className={classes.root}>
                <input
                  accept="image/*"
                  type="file"
                  id="select-image"
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <label className="uploadImg" htmlFor="select-image">
                  <AddPhotoAlternateIcon className="uploadIcon" />
                  {file && (
                    <img
                      className="disImage"
                      src={URL.createObjectURL(file)}
                      alt=""
                      height="140px"
                      width="140px"
                    />
                  )}
                </label>
              </Box>
            ) : (
              <img
                src={PF + uphoto}
                alt=""
                className="singlePostImg"
                style={{}}
              />
            ))}
          <div className="SinglePostW1">
            <h1 className="singlePostTitle">
              {updateMode ? (
                <>
                  <span className="postDetailItem">Firstname:</span>
                  <input
                    type="text"
                    value={firstname}
                    className="singlePostTitleInput"
                    autoFocus
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                  <br />
                  <span className="postDetailItem">Lastname:</span>
                  <input
                    type="text"
                    value={lastname}
                    className="singlePostTitleInput"
                    autoFocus
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </>
              ) : (
                <div className="titlePart">
                  <div>
                    {firstname} {lastname}
                  </div>
                  <div>
                    {post.username === user?.username && (
                      <div className="singlePostEdit">
                        <EditIcon
                          className="singlePostIcon "
                          onClick={() => setUpdateMode(true)}
                        />
                        <DeleteForeverSharpIcon
                          className="singlePostIcon "
                          onClick={handleDelete}
                        />
                      </div>
                    )}
                    {post.username !== user?.username && (
                      <span>
                        <ChatIcon className="postChat" onClick={handleChat} />
                      </span>
                    )}
                  </div>
                </div>
              )}
            </h1>
            <div className="postDetails">
              <ul>
                <li>
                  <span className="postDetailItem">City:</span>
                  {updateMode ? (
                    <input
                      type="text"
                      value={city}
                      className="singlePostTitleInput"
                      autoFocus
                      onChange={(e) => setCity(e.target.value)}
                    />
                  ) : (
                    <span>{city}</span>
                  )}
                </li>
                <li>
                  <span className="postDetailItem">Gender:</span>
                  {updateMode ? (
                    <input
                      type="text"
                      value={gender}
                      className="singlePostTitleInput"
                      autoFocus
                      onChange={(e) => setGender(e.target.value)}
                    />
                  ) : (
                    <span>{gender}</span>
                  )}
                </li>
                <li>
                  <span className="postDetailItem">Age:</span>{" "}
                  {updateMode ? (
                    <input
                      type="text"
                      value={missingAge}
                      className="singlePostTitleInput"
                      autoFocus
                      onChange={(e) => setMissingAge(e.target.value)}
                    />
                  ) : (
                    <span>{missingAge}</span>
                  )}
                </li>
                <li>
                  <span className="postDetailItem">Role:</span>{" "}
                  {updateMode ? (
                    <input
                      type="text"
                      value={role}
                      className="singlePostTitleInput"
                      autoFocus
                      onChange={(e) => setRole(e.target.value)}
                    />
                  ) : (
                    <span>{role}</span>
                  )}
                </li>
                <li>
                  <span className="postDetailItem">Age Category:</span>
                  {updateMode ? (
                    <input
                      type="text"
                      value={ageType}
                      className="singlePostTitleInput"
                      autoFocus
                      onChange={(e) => setAgeType(e.target.value)}
                    />
                  ) : (
                    <span>{ageType}</span>
                  )}
                </li>
                <li>
                  <span className="postDetailItem">Missing Date:</span>
                  {updateMode ? (
                    <input
                      type="text"
                      value={missingDate}
                      className="singlePostTitleInput"
                      autoFocus
                      onChange={(e) => setMissingDate(e.target.value)}
                    />
                  ) : (
                    <span>{new Date(post.missingDate).toDateString()}</span>
                  )}
                </li>
                <li>
                  <span className="postDetailItem">Phone Number:</span>{" "}
                  {updateMode ? (
                    <input
                      type="text"
                      value={num}
                      className="singlePostTitleInput"
                      autoFocus
                      onChange={(e) => setNum(e.target.value)}
                    />
                  ) : (
                    <span>{num}</span>
                  )}
                </li>
                <li>
                  <span className="postDetailItem">Address:</span>{" "}
                  {updateMode ? (
                    <input
                      type="text"
                      value={address}
                      className="singlePostTitleInput"
                      autoFocus
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  ) : (
                    <span>{address}</span>
                  )}
                </li>
              </ul>
            </div>
            {updateMode ? (
              <div style={{ margin: "0 20px" }}>
                <span className="postDetailItem">Description</span>
                <textarea
                  style={{ width: "100%" }}
                  className="singlePostDescInput"
                  value={description}
                  maxlength="300"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            ) : (
              <div style={{ width: "90%", margin: "0 20px" }}>
                <span className="postDetailItem">Description:</span>
                <p className="singlePostDesc">{description}</p>
              </div>
            )}
          </div>
          {updateMode ? null : (
            <div className="singlePostIconSide">
              <div className="singlePostInfo">
                <span className="singlePostAuthor">
                  Post by:
                  <Link
                    to={`/AllPosts/?post=${post.username}`}
                    className="link"
                  >
                    <b> {post.username}</b>
                  </Link>
                </span>
                <span className="singlePostDate">
                  {new Date(post.createdAt).toDateString()}
                </span>
              </div>
            </div>
          )}

          {updateMode && (
            <>
              <span class="singlePostButton" onClick={handleUpdate}>
                <Button
                  sx={{ margin: "0px 0 0" }}
                  variant="contained"
                  className=""
                >
                  Update
                </Button>
              </span>
              <span
                class="singlePostButton"
                onClick={() => {
                  setUpdateMode(false);
                }}
              >
                <Button
                  sx={{ margin: "0px 0 0" }}
                  variant="contained"
                  className=""
                >
                  Cancel
                </Button>
              </span>
            </>
          )}
        </div>
      </div>
    </Container>
  );
}
