import React from "react";
import { useNavigate } from "react-router-dom";

import style from "./Signup.module.css";

const Signup = () => {
    const navigate = useNavigate();

    return (
        <div className={style.signup}>
            <h1>Sign Up</h1>
            <button
                onClick={() => {
                    navigate(`/login`);
                }}
            >
                Confirm
            </button>
        </div>
    );
};

export default Signup;
