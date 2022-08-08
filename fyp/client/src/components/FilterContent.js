

import React, { useContext, useEffect, useState } from 'react';
import { LocalizationProvider, DatePicker } from '@mui/lab';
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, Link, MenuItem, Select, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import { makeStyles } from '@material-ui/core';
import DateAdapter from '@mui/lab/AdapterDateFns';
import BasicDatePicker from './Date';
import { border, borderRadius, display, fontWeight, height, textAlign } from '@mui/system';
import { Context } from '../context/Context';
import axios from 'axios';
import { format, compareAsc } from 'date-fns'
import { useNavigate } from "react-router-dom";


const useStyles = makeStyles(theme => ({
    root1: {
        width: "100%",
        padding: "25px",
        boxShadow: "0 0 13px rgb(0 0 0 / 20%)",
        borderRadius: "15px !important",
        backgroundColor: "#fff",
        '& .filterArea': {
            display: "flex",
            // justifyContent: "space-between",
            alignItems: "center",
            '& .filterName': {
                '& .MuiOutlinedInput-root': {
                    margin: "0 15px 0 0",
                }
            },
            '& .sortBy': {
                '& .MuiToggleButtonGroup-root': {
                    height: "40px",
                    margin: "16px  0 8px",
                }
            }
        },
        '& .MuiOutlinedInput-input': {
            // height:"40px !important"
        },
        '& .css-2ulfj5-MuiTypography-root': {
            display: "flex",
            fontSize: "1rem !important"
        },
        '& .MuiButtonBase-root':{
            fontSize:"16",
            [theme.breakpoints.down("sm")]: {
                fontSize:"12px",

            },
            [theme.breakpoints.down("sx")]: {
                fontSize:"10px",

            },
        }
    },

    filterTitle: {
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
    Space: {
        margin: "100px 0",
    }
}))
export const FilterContent = () => {

    const classes = useStyles();
    const [alignment, setAlignment] = React.useState('');
    const [value, setValue] = React.useState(null);
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
    let navigate = useNavigate()

    const handleAge = (event, newAlignment) => {
        setAgeType(newAlignment);
    };
    const handleGender = (event, newAlignment) => {
        setGender(newAlignment);
    };
    const [location, setLocation] = React.useState(null);

    const handleLocation = (event) => {
        setLocation(event.target.value);
    };
    const handleSubmit = async (e) => {

        e.preventDefault();
        const x = format(new Date(missingDate), 'MM-dd-yyyy')
        setMissingDate(x)
        console.log(x, "x");
        try {
            navigate(`/filterpost/${firstname}/${lastname}/${city}/${missingAge}/${x}/${ageType}/${gender}`);
        } catch { }
    };


    return (<div className={classes.Space}>
        <Container >
            <Box>  <Typography className={classes.filterTitle} variant='h2' >Search Missing Person Poster</Typography></Box>
            < Box className={`${classes.root1} ${"filterForm"}`}
                component="form" onSubmit={handleSubmit} >
                < Box className="filterArea" sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    borderRadius: 1,
                    gap: "50px",
                }} >
                    <Box className="filterName" >
                        <Typography variant="h6" >
                            Name:
                        </Typography>
                        <TextField margin='normal'
                            size="small"
                            label="First Name"
                            type="text"
                            name="firstname"
                            onChange={e => setFirstname(e.target.value)}
                        />
                        <TextField margin='normal'
                            size="small"
                            name="password"
                            label="Last Name"
                            type="text"
                            onChange={e => setLastname(e.target.value)}
                        />
                    </Box>
                    <Box >
                        < Typography variant="h6" >
                            Location:
                        </Typography>
                        <TextField
                            size="small"
                            label="City"
                            type="text"
                            name="fircitystname"
                            onChange={e => setCity(e.target.value)}
                        />
                    </Box>
                    <Box  >
                        <Typography variant="h6" >
                            Missing Date:
                        </Typography>
                        <LocalizationProvider dateAdapter={DateAdapter} >
                            <DatePicker

                                label="Missing Date"
                                value={value}
                                onChange={
                                    (newValue) => {
                                        setValue(newValue);
                                    }

                                }
                                renderInput={
                                    (params) =>
                                        < TextField
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
                                            sx={
                                                { width: "100%" }
                                            } {...params}
                                        />} />
                        </LocalizationProvider>
                        {/* <LocalizationProvider dateAdapter={DateAdapter} >
                            <DatePicker

                                label="From"
                                value={value}
                                onChange={
                                    (newValue) => {
                                        setValue(newValue);
                                    }
                                }
                                renderInput={
                                    (params) => < TextField
                                        size="small"
                                        sx={
                                            { margin: "16px 15px 8px 0", width: "150px" }
                                        } {...params}
                                    />} />
                            <DatePicker
                                label="To"
                                value={value}
                                onChange={
                                    (newValue) => {
                                        setValue(newValue);
                                    }
                                }
                                renderInput={
                                    (params) => < TextField size="small" sx={
                                        { margin: "16px 0 8px", width: "150px" }
                                    } {...params}
                                    />} />
                        </LocalizationProvider> */}
                    </Box >
                    <Box sx={{
                        display: "flex"
                    }
                    } >
                        <Box >
                            <Typography variant="h6" >
                                Missing Age:
                            </Typography>
                            <TextField
                                size="small"
                                label="Missing Age"
                                type="text"
                                name="firstname"
                                sx={
                                    { margin: "16px 15px  8px 0", width: "150px" }
                                }
                                onChange={e => setMissingAge(e.target.value)}
                            />
                        </Box >

                        {/* <Box >
                            <Typography variant="h6" >
                                Current Age </Typography>
                            <TextField
                                name="password"
                                label="Current Age"
                                type="text"
                                size="small"
                                sx={
                                    { margin: "16px 0 8px", width: "150px" }
                                }
                                onChange={e => setCity(e.target.value)}
                            />
                        </Box > */}
                    </Box>
                    <Box>
                        <Typography variant="h6" >
                            Gender
                        </Typography>
                        <ToggleButtonGroup
                            size="small"
                            color="primary"
                            value={gender}
                            exclusive
                            onChange={handleGender}
                            sx={
                                { margin: "16px 0  8px 0", height: "40px" }
                            }
                        >
                            <ToggleButton value="Male">
                                Male
                            </ToggleButton>
                            <ToggleButton value="Female" >
                                Female
                            </ToggleButton>
                            <ToggleButton value="Others" >
                                Others
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                    <Box>
                        <Typography variant="h6" >
                            Age Type
                        </Typography>
                        <ToggleButtonGroup
                            sx={
                                { margin: "16px 0  8px 0", height: "40px" }
                            }
                            color="primary"
                            value={ageType}
                            exclusive
                            onChange={handleAge}
                        >
                            <ToggleButton value="Child(1-To-12)">
                                (1-to-12)
                            </ToggleButton>
                            <ToggleButton value="Teenager(13-To-29)" >
                                (13-to-29)
                            </ToggleButton>
                            <ToggleButton value="Adult(30-To-69)" >
                                (30-to-69)
                            </ToggleButton>
                            <ToggleButton value="Old(70-To-100)" >
                                (70 to 100+)
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                    <Box sx={{ m: "33px 0 0" }}>
                        <Button sx={{ m: "0", height: "40px", p: "0 25px " }} type="submit" variant="outlined">Submit</Button>
                        <Button sx={{ m: "0 15px 0", height: "40px", p: "0 25px " }} variant="outlined">Reset</Button>
                    </Box>
                </Box>
            </Box>
        </Container >
    </div>
    )
};