import React, { useState, useEffect, useContext } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box } from '@mui/system';
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns';
import { Alert, Avatar } from '@mui/material';
import { Context } from '../context/Context';
import axios from "axios";
import jwt_decode from "jwt-decode";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
import { Button, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles(theme => ({
    root: {
        '& .uploadImg': {
            justifyContent: "center",
            height: "150px",
            width: "150px",
            float: "left",
            background: "#fff",
            alignItems: "center",
            border: "5px solid  #000",
            borderRadius: "50%",
            display: "flex",
            position: "relative",
            '& .uploadIcon': {
                color: "#000",
                fontSize: "24px",
                height: "30px",
                width: "30px"
            },
            '& .disImage': {
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                margin: "auto",
                borderRadius: "50%",
                height: "140px",
                width: "140px",
            },

        },
        '& .uploadImg2': {
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
        '& .matchTitle': {
            fontSize: "33px !important",
            fontWeight: "bold !important",
            margin: "20px 0 50px !important",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        '& .imageContentHolder': {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            [theme.breakpoints.down("sm")]: {
                justifyContent: "center",
                gap: "30px 0"
            },
            '& .arrowImage': {
                [theme.breakpoints.down("sm")]: {
                    transform: "rotate(90deg)",
                    margin: "100px 0",
                }
            }
        },
        '& .fetchBtnHolder': {
            textAlign: "center",
            '& .fetchBtn': {
                width: "300px",
                margin: "0 auto",
                background: "#000",
                fontSize: "18px",
                fontWeight: "bold",
                color: "#fff",
                textTransform: "none"
            }
        }

    },
    Space: {
        margin: "100px 0",
    }
}))
export default function UpdateProfileForm() {
    const { user, dispatch } = useContext(Context);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [value, setValue] = React.useState(null);
    const classes = useStyles();
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [gender, setGender] = useState("");
    const [role, setRole] = useState("");
    const [successDel, setSuccessDel] = useState(false);
    const [errorDel, setErrorDel] = useState(false);
    const [successUpdate, setSuccessUpdate] = useState(false);
    const [errorUpdate, setErrorUpdate] = useState(false);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const PF = "http://localhost:5000/images/"


    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "UPDATE_START" });
        const updatedUser = {
            _id: user._id,
            username,
            lastname,
            email,
            password,
            address,
            city,
            gender,
            role,
            token: user.token
        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            updatedUser.profilePic = filename;
            try {
                await axios.post("/upload", data);
            } catch (err) { }
        }
        try {


            const res = await axios.put("/users/" + user._id, updatedUser, {
                headers: { authorization: "Bearer " + user.token },
            });
            setSuccessUpdate(true);
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        } catch (err) {
            setErrorUpdate(true);
            dispatch({ type: "UPDATE_FAILURE" })
            console.log("err", err);
        }
    };
    useEffect(() => {
        setUsername(user.username)
        setEmail(user.email)
        setAddress(user.address)
        setCity(user.city)
        setGender(user.gender)
        setRole(user.role)
    }, [])

    const handleDelete = async () => {
        try {
            const res = await axios.delete("/users/" + user._id, {
                headers: { authorization: "Bearer " + user.token },
            });
            res.data && window.location.replace("/login")
            setSuccessDel(true);

        } catch (err) {
            setErrorDel(true)
            console.log(err);
        }
    };

    useEffect(() => {

    }, []);
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Update Profile
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <Grid container spacing={3}>
                    <Grid className={classes.root} item xs={12} sm={12}>
                        <Box>
                            <input
                                accept="image/*"
                                type="file"
                                id="select-image"
                                style={{ display: 'none' }}
                                onChange={e => setFile(e.target.files[0])}
                            />
                            <label className="uploadImg" htmlFor="select-image"  >
                                <CloudUploadTwoToneIcon className='uploadIcon' />
                                <Avatar className='disImage' src={file ? URL.createObjectURL(file) : PF + user.profilePic} height="140px !important" width="140px !important" />
                            </label>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            size="small"
                            required
                            id="username"
                            name="username"
                            label="User Name"
                            fullWidth
                            autoComplete="given-name"
                            variant="outlined"
                            value={username}
                            defaultValue={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            size="small"
                            required
                            disabled
                            id="email"
                            name="email"
                            label="Email"
                            fullWidth
                            autoComplete="family-name"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            size="small"
                            required
                            id="password"
                            name="password"
                            label="Password"
                            fullWidth
                            type="password"
                            autoComplete="shipping address-line1"
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            size="small"
                            required
                            id="address1"
                            name="address"
                            label="Address"
                            fullWidth
                            autoComplete="shipping address-line1"
                            variant="outlined"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            size="small"
                            required
                            id="city"
                            name="city"
                            label="City"
                            fullWidth
                            autoComplete="shipping address-level2"
                            variant="outlined"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}

                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            size="small"
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            label="Gender"
                            select
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
                    <Grid item xs={12} sm={6}>
                        <TextField
                            size="small"
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            label="Role"
                            select
                            variant="outlined"
                            fullWidth={true}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"Finder"}>Finder</MenuItem>
                            <MenuItem value={"Provider"}>Provider</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type='submit' variant="contained" className="updateBtn">Update</Button>
                        <Button variant="contained" style={{ margin: "0 0 0 15px !important" }} onClick={handleClickOpen}>Delete Account</Button>
                    </Grid>
                </Grid>
                <div style={{ margin: "15px 0 0 0" }}>
                    {successDel && (
                        <Alert severity="success">Account is Deleted successfully</Alert>
                    )}
                    {errorDel && (
                        <Alert severity="error">Some is Wrong!</Alert>
                    )}
                    {successUpdate && (
                        <Alert severity="success">Account is Updated successfully</Alert>
                    )}
                    {errorUpdate && (
                        <Alert severity="error">Some is Wrong!</Alert>
                    )}
                </div>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>Delete Account Permanently</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Are You Sure to Delete Account Permanently?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" size="small" onClick={handleClose}>Disagree</Button>
                        <Button variant="contained" size="small" onClick={handleDelete}>Agree</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </React.Fragment>
    );
}