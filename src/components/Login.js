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
        </div>
    );
};

export default Login;
