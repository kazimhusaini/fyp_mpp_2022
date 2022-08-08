import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { Context } from "./context/Context";
// ******************************
const ForgotPassUseForm = ({ initState, callback, validator }) => {
    const [state, setState] = useState(initState);
    const [errors, setErrors] = useState({});
    const [open, setOpen] = useState(false);
    const [eText, setEText] = useState("");
    const [isSubmited, setIsSubmited] = useState(false);
    // ******************************
    useEffect(() => {
        const isValidErrors = () =>
            Object.values(errors).filter(error => typeof error !== "undefined")
                .length > 0;
        if (isSubmited && !isValidErrors()) callback();
        console.log(state.email);
    }, [errors]);

    // ******************************
    const handleChange = e => {
        const { name, value } = e.target;
        setState(() => ({
            ...state,
            [name]: value
        }));
          const { name: fieldName } = e.target;
        const faildFiels = validator(state, fieldName);
        setErrors(() => ({
            ...errors,
            [fieldName]: Object.values(faildFiels)[0]
        }));
    };

    // ******************************
    const handleBlur = e => {
     
    };

    const userRef = useRef();
    const { user, dispatch, isFetching } = useContext(Context);

    // ******************************
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name: fieldName } = e.target;
        const faildFiels = validator(state, fieldName);
        setErrors(() => ({
            ...errors,
            [fieldName]: Object.values(faildFiels)[0]
        }));
        setIsSubmited(true);
        try {
            const res = await axios.put("/auth/forgot_password", {
              email:state.email,
            });
            console.log("forgot password work");
          } catch (err) {
            console.log("forgot password error");
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
        open
    };
};

export default ForgotPassUseForm;
