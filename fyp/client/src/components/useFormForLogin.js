import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { Context } from "../context/Context";
import { useNavigate } from "react-router-dom";

// ******************************
const useForm = ({ initState, callback, validator }) => {
  const [state, setState] = useState(initState);
  const [errors, setErrors] = useState({});
  const [eText, setEText] = useState("");
  const [isSubmited, setIsSubmited] = useState(false);
  const userRef = useRef();
  const passwordRef = useRef();
  const [open, setOpen] = useState(false);
  const { user, dispatch, isFetching } = useContext(Context);
  const [posts, setPosts] = useState([]);
  let navigate = useNavigate()

  // ******************************
  useEffect(() => {
    const isValidErrors = () =>
      Object.values(errors).filter((error) => typeof error !== "undefined")
        .length > 0;
    if (isSubmited && !isValidErrors()) callback();
  }, []);

  // ******************************
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(() => ({
      ...state,
      [name]: value,
    }));
    const { name: fieldName } = e.target;
    const faildFiels = validator(state, fieldName);
    setErrors(() => ({
      ...errors,
      [fieldName]: Object.values(faildFiels)[0],
    }));
  };

  // ******************************
  const handleBlur = (e) => {
    const { name: fieldName } = e.target;
    const faildFiels = validator(state, fieldName);
    setErrors(() => ({
      ...errors,
      [fieldName]: Object.values(faildFiels)[0],
    }));
  };

  // ******************************
  // const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     const { name: fieldName } = e.target;
  //     const faildFiels = validator(state, fieldName);
  //     setErrors(() => ({
  //         ...errors,
  //         [fieldName]: Object.values(faildFiels)[0]
  //     }));
  //     setIsSubmited(true);
  //     try {
  //         const res = await axios.post("/auth/register", state);
  //         res.data && window.location.replace("/email_verification")
  //     }
  //     catch (err) {
  //         console.log(err);
  //     }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name: fieldName } = e.target;
    const faildFiels = validator(state, fieldName);
    setErrors(() => ({
      ...errors,
      [fieldName]: Object.values(faildFiels)[0],
    }));
    setIsSubmited(true);
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        email: state.email,
        password: state.password,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });             
      res.data && navigate("/dash");

      console.log(res);
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      if (err.response.data) {
        setEText(err.response.data);
        setOpen(true);
      }
    }
  };

  return {
    handleChange,
    handleSubmit,
    handleBlur,
    state,
    open,
    eText,
    setEText,
    setOpen,
    errors,
  };
};

export default useForm;
