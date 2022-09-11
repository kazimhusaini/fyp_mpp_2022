import { useState, useEffect, useRef, useContext } from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { makeStyles } from "@material-ui/core";
import { fontSize, margin, textTransform } from "@mui/system";
import EastIcon from "@mui/icons-material/East";
import {
  Alert,
  CircularProgress,
  Collapse,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import arrowImg from "./images/images.jpg";
import * as faceapi from "face-api.js";
import { ca } from "date-fns/locale";
import { MSlider } from "./MSlider";
import { context } from "../context/Context";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation } from "react-router-dom";
import { Context } from "../context/Context";
import RiseLoader from "react-spinners/RiseLoader";
import axios from "axios";
import "./scaningeffect.css";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .uploadImg": {
      justifyContent: "center",
      height: "250px",
      width: "250px",
      float: "left",
      margin: "20px",
      background: "#fff",
      alignItems: "center",
      border: "2px dashed  #000",
      display: "flex",
      position: "relative",
      "& img": {
        height: "240px",
        width: "240px",
      },
      "& .uploadIcon": {
        color: "#000",
        fontSize: "24px",
        height: "30px",
        width: "30px",
      },
      "& .disImage": {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: "auto",
      },
      [theme.breakpoints.down("md")]: {
        height: "200px",
        width: "200px",
        "& img": {
          height: "154px",
          width: "154px",
        },
      },
      [theme.breakpoints.down("sm")]: {
        height: "160px",
        width: "160px",
        "& img": {
          height: "150px",
          width: "150px",
        },
      },
    },
    "& .uploadImg2": {
      justifyContent: "center",
      height: "254px",
      width: "254px",
      float: "left",
      margin: "20px",
      background: "#E7E7E7",
      alignItems: "center",
      // border: "2px dashed  #000",
      display: "flex",
      position: "relative",
      "& .css-1xdhyk6": {
        // top: "0",
        // left: "0",
        // right: "0",
        // bottom: "0",
        // margin: "auto",
        position: "absolute",
      },
      [theme.breakpoints.down("md")]: {
        height: "204px",
        width: "204px",
        "& img": {},
      },
      [theme.breakpoints.down("sm")]: {
        height: "164px",
        width: "164px",
        "& img": {
          height: "154px",
          width: "154px",
        },
      },
    },
    "& .matchTitle": {
      fontSize: "33px !important",
      fontWeight: "bold !important",
      margin: "20px 0 50px !important",
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      [theme.breakpoints.down("sm")]: {
        fontSize: "25px !important",
      },
    },
    "& .imageContentHolder": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 0 15px 2px rgba(0,0,0,0.1)",
      padding: "50px 30px 80px",
      margin: "20px",
      [theme.breakpoints.down("sm")]: {},
      [theme.breakpoints.down("xs")]: {
        justifyContent: "center",
        gap: "30px 0",
        justifyContent: "center",
        flexDirection: " column",
        
      },
      "& .arrowImage": {
        width: "auto",
        [theme.breakpoints.down("md")]: {
          // transform: "rotate(90deg)",
          // margin: "120px 0 0",
          "& img": {
            height: "62px",
          },
        },
        [theme.breakpoints.down("xs")]: {
          transform: "rotate(90deg)",
          // margin: "120px 0 0",
          "& img": {
            height: "42px",
          },
        },
      },
    },
    "& .fetchBtnHolder": {
      textAlign: "center",
      position: "absolute",
      bottom: "-54px",
      "& .fetchBtn": {
        width: "250px",
        margin: "0 auto",
        background: "#000",
        fontSize: "18px",
        fontWeight: "bold",
        color: "#fff",
        textTransform: "none",
        [theme.breakpoints.down("md")]: {
          width: "280px",
        },
        [theme.breakpoints.down("sm")]: {
          width: "160px",
        },
      },
    },
  },
  Space: {
    margin: "100px 0",
  },
}));
const UploadImage = ({ post }) => {
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#1976d2");
  const { user, dispatch, isFetching } = useContext(Context);
  const PF = "http://localhost:5000/images/";
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const [id, setId] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    //   const fetchPosts = async () => {
    //     const res = await axios.get("/posts"+search);
    //     setPosts(res.data);
    //   };

    //   fetchPosts();
    const fecthData = async () => {
      await axios.get("/posts").then((res) => {
        setPosts(res.data);
      });
    };
    fecthData();
    //   console.log(posts);
    //   {posts.map((p) => (
    //     // console.log(p._id)
    //     setId(p

    //   ))}
    //   console.log(id);
    // console.log(post._id);
  }, []);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [newName, setNewName] = useState("");
  const classes = useStyles();
  const imgRef = useRef();
  const canvasRef = useRef();
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
      setShow(true);
    }
  }, [selectedImage]);

  function loadLabeledImages() {
    const labels = posts;
    try {
      return Promise.all(
        labels.map(async (label) => {
          const descriptions = [];
          for (let i = 1; i <= 2; i++) {
            // const imgUrl = 'http://localhost:5000/images/' + `${label.photo}`
            const imgUrl = "http://localhost:5000/images/" + `${label.photo}`;

            const img = await faceapi.fetchImage(imgUrl);
            const detections = await faceapi
              .detectSingleFace(img)
              .withFaceLandmarks()
              .withFaceDescriptor();
            descriptions.push(detections.descriptor);
          }
          return new faceapi.LabeledFaceDescriptors(label._id, descriptions);
        })
      );
    } catch (err) {
      console.log(err, "err");
    }
  }
  async function start() {
    const container = document.createElement("div");
    container.style.position = "relative";
    document.body.append(container);
    const labeledFaceDescriptors = await loadLabeledImages();
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);
    imgRef.current = await faceapi.bufferToImage(selectedImage);
    canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(imgRef.current);
    faceapi.matchDimensions(canvasRef.current, { width: 290, height: 290 });
    // const displaySize = { width: imgRef.current.width, height: imgRef.current.height }
    // faceapi.matchDimensions(canvasRef.current, displaySize)
    const detections = await faceapi
      .detectAllFaces(imgRef.current)
      .withFaceLandmarks()
      .withFaceDescriptors();
    const resizedDetections = faceapi.resizeResults(detections, {
      width: 290,
      height: 290,
    });
    faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
    const results = resizedDetections.map((d) =>
      faceMatcher.findBestMatch(d.descriptor)
    );

    results.forEach((result, i) => {
      const box = resizedDetections[i].detection.box;
      const drawBox = new faceapi.draw.DrawBox(box, {
        label: result.toString(),
      });
      setNewName(result);
      drawBox.draw(canvasRef.current);

      // console.log(result.label, "result");
      setLoading(false);
      if (result.label === result.label) {
        if (result.label === "unknown") {
          console.log("not found");
          setOpen(true);
        } else {
          window.location.href = `/post/${result.label}`;
        }
      } else {
        console.log("not found");
        setOpen(true);
      }
    });
  }
  const onFetchImage = () => {
    setLoading(true);
    Promise.all([
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
    ])
      .then(start)
      .catch((e) => console.log("err", e));

    imgRef.current && start();
  };
  useEffect(() => {}, [selectedImage]);

  return (
    <div className={classes.Space}>
      <Container>
        <Collapse in={open}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <strong>Image not found</strong>
          </Alert>
        </Collapse>
        <Box className={classes.root}>
          <Typography className="matchTitle" variant="h2">
            Image Matching
          </Typography>
          <Box>
            <div class="cPanelContent">
              <div class="cPanelSection">
                <div class="cPanelArrowPulse"></div>
                <h5>Step 01</h5>
                <p>
                  <ul>
                    <li>Click on first box to Upload Image</li>
                    <li>Image type should be jpg, png or Jpeg</li>
                    <li>Image pixel should be clear </li>
                  </ul>
                </p>
              </div>

              <div class="cPanelSection">
                <div class="cPanelArrowPulse"></div>
                <h5>Step 02</h5>
                <p>Press Search Button</p>
              </div>

              {/* <div class="cPanelSection">
                  <div class="cPanelArrowPulse"></div>
                  <h5>Section 03</h5>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text.
                  </p>
                </div>

                <div class="cPanelSection">
                  <h5>Section 04</h5>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text.
                  </p>
                </div> */}
            </div>
          </Box>
          <Box className="imageContentHolder ">
            <Box>
              <Box>
                <input
                  accept="image/*"
                  type="file"
                  id="select-image"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    setSelectedImage(e.target.files[0]);
                  }}
                />
                <label className="uploadImg" htmlFor="select-image">
                  <AddPhotoAlternateIcon className="uploadIcon" />
                  {imageUrl && selectedImage && (
                    <img
                      className="disImage"
                      src={imageUrl}
                      alt={selectedImage.name}
                      height="240px"
                      width="240px"
                    />
                  )}
                </label>
              </Box>
            </Box>
            {show ? (
              <>
                <Box className="arrowImage">
                  <img src={arrowImg} />
                </Box>
                <Box>
                  <div className="uploadImg2">
                    {imageUrl && selectedImage && (
                      <div>
                        <img
                          ref={imgRef}
                          style={{ position: "relative" }}
                          className="disImage"
                          src={imageUrl}
                          alt={selectedImage.name}
                          height="240px"
                          width="240px"
                        />
                        <canvas
                          ref={canvasRef}
                          style={{ position: "absolute", top: 0, left: 0 }}
                        />
                      </div>
                    )}
                    {loading ? <RiseLoader color={color} /> : null}
                    <Box className="fetchBtnHolder">
                      {show ? (
                        <Button
                          className="fetchBtn"
                          variant="contained"
                          onClick={onFetchImage}
                        >
                          Search
                        </Button>
                      ) : null}
                    </Box>
                  </div>
                </Box>
              </>
            ) : null}
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default UploadImage;
