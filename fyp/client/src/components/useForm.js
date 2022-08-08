import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// ******************************
const useForm = ({ initState, callback, validator }) => {
  const [state, setState] = useState(initState);
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [eText, setEText] = useState("");
  const [isSubmited, setIsSubmited] = useState(false);
  let navigate = useNavigate()
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
  const handleBlur = (e) => {
    const { name: fieldName } = e.target;
    const faildFiels = validator(state, fieldName);
    setErrors(() => ({
      ...errors,
      [fieldName]: Object.values(faildFiels)[0],
    }));
  };

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
      const res = await axios.post("/auth/register", state);
      res.data && navigate("/email_verification");
    } catch (err) {
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
    eText,
    setEText,
    errors,
    setOpen,
    open,
  };
};

export default useForm;
