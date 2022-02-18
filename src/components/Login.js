import React from "react";
import { useNavigate } from "react-router-dom";

import style from "./Login.module.css";

const Login = () => {
    const navigate = useNavigate();

    return (
        <div className={style.login}>
            <h1>LOGIN</h1>
            <button
                onClick={() => {
                    navigate(`/main`);
                }}
            >
                LOGIN
            </button>
            <br />
            <br />
            <h2>If you're a new user, sign up for a new account!</h2>
            <button
                onClick={() => {
                    navigate(`/signup`);
                }}
            >
                SIGNUP
            </button>
        </div>
    );
};

export default Login;
