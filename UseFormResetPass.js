import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../context/Context";

// ******************************
const UseFormResetPass = ({ initState, callback, validator }) => {
  const [state, setState] = useState(initState);
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [eText, setEText] = useState("");
  const [isSubmited, setIsSubmited] = useState(false);
  const {resetToken} = useParams();
let navigate=useNavigate();

  // ******************************
  useEffect(() => {
    const isValidErrors = () =>
      Object.values(errors).filter((error) => typeof error !== "undefined")
        .length > 0;
    if (isSubmited && !isValidErrors()) callback();
  }, [errors]);

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
  const handleBlur = (e) => {};

  const userRef = useRef();
  const { user, dispatch, isFetching } = useContext(Context);
  const passwordRef = useRef();


  // ******************************
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name: fieldName } = e.target;
    const faildFiels = validator(state, fieldName);
    setErrors(() => ({
      ...errors,
      [fieldName]: Object.values(faildFiels)[0],
    }));
    setIsSubmited(true);
    try {
      const res = await axios.put("/auth/reset_password", {
        newPass: state.password,
        resetLink: resetToken,
      });
      console.log(" password change");
      res.data && navigate("/login");
    } catch (err) {
        if (err.response.data) {
            console.log(resetToken,"t");
            console.log(" password not change",err.response.data,"s");
            navigate("/login");

        }

    }
  };

  return {
    handleChange,
    handleSubmit,
    handleBlur,
    state,
    eText,
    setEText,
    errors,
    setOpen,
    open,
  };
};

export default UseFormResetPass;
