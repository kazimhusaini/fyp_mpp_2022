import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Box } from "@mui/system";
import OTPInput, { ResendOTP } from "otp-input-react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import {
  Button,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { Modal, TextareaAutosize } from "@mui/material";
import { Context } from "../../context/Context";
import axios from "axios";
import { format, compareAsc, set } from "date-fns";
import LinearIndeterminate from "../Linearbar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import LockIcon from "@mui/icons-material/Lock";
import Avatar from "@mui/material/Avatar";
import  { Link } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .uploadImg": {
      justifyContent: "center",
      height: "150px",
      width: "150px",
      float: "left",
      background: "#fff",
      alignItems: "center",
      border: "2px dashed  #000",
      display: "flex",
      position: "relative",
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
    },
    "& .uploadImg2": {
      justifyContent: "center",
      height: "140px",
      width: "140px",
      float: "left",
      margin: "20px",
      background: "#E7E7E7",
      alignItems: "center",
      // border: "2px dashed  #000",
      display: "flex",
      position: "relative",
    },
    "& .matchTitle": {
      fontSize: "33px !important",
      fontWeight: "bold !important",
      margin: "20px 0 50px !important",
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    "& .imageContentHolder": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      [theme.breakpoints.down("sm")]: {
        justifyContent: "center",
        gap: "30px 0",
      },
      "& .arrowImage": {
        [theme.breakpoints.down("sm")]: {
          transform: "rotate(90deg)",
          margin: "100px 0",
        },
      },
    },
    "& .fetchBtnHolder": {
      textAlign: "center",
      "& .fetchBtn": {
        width: "300px",
        margin: "0 auto",
        background: "#000",
        fontSize: "18px",
        fontWeight: "bold",
        color: "#fff",
        textTransform: "none",
      },
    },
  },
  Space: {
    margin: "100px 0",
  },
}));
export default function AddressForm() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [value, setValue] = useState(null);
  const classes = useStyles();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [missingAge, setMissingAge] = useState("");
  const [gender, setGender] = useState("");
  const [ageType, setAgeType] = useState("");
  const [missingDate, setMissingDate] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const { user, dispatch } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);
  const [OTP, setOTP] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open2, setOpen2] = useState(true);
  const [open3, setOpen3] = useState(false);
  const [bool, setBool] = useState(Boolean);
  useEffect(async () => {
    // localStorage.setItem("mpp2", JSON.stringify(state.user));
    console.log(user.verifiedNumber);
    if (user.verifiedNumber === true) {
      setOpen2(false);
      console.log(user.verifiedNumber, "t");
    }
  }, []);
  const handleVerifyNumber = async () => {
    setOpen2(false);
    setOpen3(true);
    try {
      await axios.post("/otp/sentOtp");
    } catch (err) {
      console.log(err);
    }
  };
  const handleResendOpt = async () => {
    try {
      await axios.post("/otp/resend");
      console.log("w");
    } catch (err) {
      console.log(err);
    }
  };

  const handleVerifyOTP = async () => {
    setOpen2(false);
    setOpen3(true);

    try {
      dispatch({ type: "UPDATE_START" });
      await axios.post(`/otp/verify/${user._id}`, {
        otp: OTP,
      });
      setOpen3(false);
      try {
        const updatedUser = {
          verifiedNumber: true,
        };
        const res = await axios.put("/users/" + user._id, updatedUser, {
          headers: { authorization: "Bearer " + user.token },
        });
        dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      } catch (err) {
        dispatch({ type: "UPDATE_FAILURE" });
        console.log("err", err);
      }
    } catch (err) {
      setOpen3(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });

    const x = format(new Date(missingDate), "MM-dd-yyyy");
    setMissingDate(x);
    // console.log(x, "x");
    const newPost = {
      username: user.username,
      email: user.email,
      number: user.number,
      firstname,
      lastname,
      address,
      city,
      missingAge,
      gender,
      ageType,
      missingDate: x,
      role,
      description,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.post("/posts", newPost);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000);

      window.location.replace("/post/" + res.data._id);
    } catch (err) {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <React.Fragment>
      {loading && loading ? (
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
          <LinearIndeterminate />
        </div>
      ) : null}
      <Typography variant="h6" gutterBottom>
        Generate Post
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid className={classes.root} item xs={12} sm={12}>
            <Box>
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
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              size="small"
              fullWidth
              autoComplete="given-name"
              variant="outlined"
              onChange={(e) => setFirstname(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              size="small"
              fullWidth
              autoComplete="family-name"
              variant="outlined"
              onChange={(e) => setLastname(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address"
              label="Address"
              fullWidth
              size="small"
              autoComplete="shipping address-line1"
              variant="outlined"
              onChange={(e) => setAddress(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              size="small"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
              variant="outlined"
              onChange={(e) => setCity(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="mage"
              name="mage"
              label="Missing Age"
              size="small"
              required
              fullWidth
              variant="outlined"
              onChange={(e) => setMissingAge(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            {/* <InputLabel id="demo-simple-select-standard-label">Gender</InputLabel> */}
            <TextField
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              label="Gender"
              select
              size="small"
              required
              variant="outlined"
              fullWidth={true}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
              <MenuItem value={"Others"}>Others</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            {/* <InputLabel id="demo-simple-select-standard-label">Age Type</InputLabel> */}
            <TextField
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={ageType}
              onChange={(e) => setAgeType(e.target.value)}
              label="Age Type"
              select
              size="small"
              required
              fullWidth={true}
              variant="outlined"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"Child(1-To-12)"}>Child(1 To 12)</MenuItem>
              <MenuItem value={"Teenager(13-To-29)"}>
                Teenager(13 To 29)
              </MenuItem>
              <MenuItem value={"Adult(30-To-69)"}>Adult(30 To 69)</MenuItem>
              <MenuItem value={"Old(70-To-100)"}>Old(70 To 100)</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <LocalizationProvider dateAdapter={DateAdapter}>
              <DatePicker
                label="Missing Date"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    required
                    id="Missing Date"
                    name="Missing Date"
                    label="Missing Date"
                    fullWidth
                    value={value}
                    size="small"
                    onChange={setMissingDate(value)}
                    autoComplete="Missing Date"
                    variant="outlined"
                    sx={{ width: "100%" }}
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={4}>
            {/* <InputLabel id="demo-simple-select-standard-label">Role</InputLabel> */}
            <TextField
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={role}
              variant="outlined"
              onChange={(e) => setRole(e.target.value)}
              label="Role"
              size="small"
              fullWidth={true}
              select
              required
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"Finder"}>Finder</MenuItem>
              <MenuItem value={"Provider"}>Provider</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={12}>
            <InputLabel id="demo-simple-select-standard-label">
              Description
            </InputLabel>
            <TextareaAutosize
              className="textAreaG"
              aria-label="minimum height"
              minRows={3}
              required
              placeholder=""
              style={{
                width: "100%",
                height: "200px",
                resize: "none",
                margin: "20px 0 0 0",
                backgroundColor: "#fff",
              }}
              onChange={(e) => setDescription(e.target.value)}
              maxlength="300"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained">
              POST
            </Button>
          </Grid>
        </Grid>
      </Box>
      <div>
        <Dialog
          open={open2}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Please verify you Number
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {user.number}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleVerifyNumber}>
              Verify
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={open3}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {user.number}
              <Container component="main" maxWidth="sm">
                <CssBaseline />
                <div className={classes.paper}>
                  <Grid
                    container
                    className={classes.grid}
                    justify="center"
                    alignItems="center"
                    spacing={3}
                  >
                    <Grid item container justify="center">
                      <Grid
                        item
                        container
                        alignItems="center"
                        direction="column"
                      >
                        <Grid item>
                          <Avatar className={classes.avatar}>
                            <LockIcon />
                          </Avatar>
                        </Grid>
                        <Grid item>
                          <Typography component="h1" variant="h5">
                            Verification Code
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} textAlign="center">
                      <Typography variant="h6">
                        Please enter the verification code sent to your mobile
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      container
                      justify="center"
                      alignItems="center"
                      direction="column"
                    >
                      <Grid item spacing={3} justify="center">
                        <OTPInput
                          value={OTP}
                          onChange={setOTP}
                          autoFocus
                          OTPLength={4}
                          otpType="number"
                          disabled={false}
                          secure
                        />
                        <ResendOTP
                          style={{ marginTop: "20px" }}
                          onResendClick={handleResendOpt}
                        />
                      </Grid>
                      <Grid item xs={12} container justifyContent="flex-end">
                        <Button onClick={handleVerifyOTP} style={{margin:"0 10px 0 0"}}>Verify</Button>
                        <Link to="/dash" style={{textDecoration:"none"}}>
                          <Button>Cancel</Button>
                        </Link>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              </Container>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    </React.Fragment>
  );
}
