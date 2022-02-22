import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { loginActions } from "../store/login";
import style from "./Login.module.css";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const storeLoginEmail = useSelector((state) => state.login.loginEmail);
    const storeLoginPassword = useSelector(
        (state) => state.login.loginPassword
    );

    const handleChangeLoginEmail = (e) => {
        e.preventDefault();
        const email = e.target.value;
        dispatch(loginActions.changeLoginEmail(email));
    };

    const handleChangeLoginPassword = (e) => {
        e.preventDefault();
        const password = e.target.value;
        dispatch(loginActions.changeLoginPassword(password));
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const payload = {
            email: storeLoginEmail,
            password: storeLoginPassword,
        };
        const res = await fetch(`http://localhost:5000/verifylogin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        console.log(`Status: ${res.status}, login processed`);
        const data = await res.json();
        localStorage.setItem("token", data.token);
        console.log(data.userId);
        localStorage.setItem("userId", data.userId);
        navigate("/main");
    };

    return (
        <div className={style.loginWrapper}>
            <div className={style.login}>
                <h1>LOGIN</h1>
                <form onSubmit={handleLogin}>
                    <input
                        placeholder="Email"
                        name="email"
                        onChange={handleChangeLoginEmail}
                    />
                    <input
                        placeholder="Password"
                        name="password"
                        onChange={handleChangeLoginPassword}
                    />
                    <br />
                    <button type="submit">Login</button>
                </form>
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
        </div>
    );
};

export default Login;
