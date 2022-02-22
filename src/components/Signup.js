import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { signUpActions } from "../store/signup";

import style from "./Signup.module.css";

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const storeRegName = useSelector((state) => state.signup.regName);
    const storeRegEmail = useSelector((state) => state.signup.regEmail);
    const storeRegPassword = useSelector((state) => state.signup.regPassword);
    const storeRegPassword2 = useSelector((state) => state.signup.regPassword2);

    useEffect(() => {
        // CALL BACKEND API HERE

        const prepareAccountTables = async () => {
            const res = await fetch(`http://127.0.0.1:5000/prepareregister/`, {
                method: "POST",
            });
            console.log(`Status: ${res.status}, account tables prepared.`);
        };
        prepareAccountTables();

        // eslint-disable-next-line
    }, []);

    const handleChangeRegName = (e) => {
        e.preventDefault();
        const name = e.target.value;
        dispatch(signUpActions.changeRegName(name));
    };

    const handleChangeRegEmail = (e) => {
        e.preventDefault();
        const email = e.target.value;
        dispatch(signUpActions.changeRegEmail(email));
    };

    const handleChangeRegPassword = (e) => {
        e.preventDefault();
        const password = e.target.value;
        dispatch(signUpActions.changeRegPassword(password));
    };

    const handleChangeRegPassword2 = (e) => {
        e.preventDefault();
        const password2 = e.target.value;
        dispatch(signUpActions.changeRegPassword2(password2));
    };

    const handleNewReg = async (e) => {
        e.preventDefault();

        if (storeRegPassword === storeRegPassword2) {
            const payload = {
                name: storeRegName,
                email: storeRegEmail,
                password: storeRegPassword,
            };
            const res = await fetch(`http://localhost:5000/registeruser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            console.log(`Status: ${res.status}, user created.`);
            navigate("/login");
        } else {
            console.log("Passwords do not match!");
        }
    };

    return (
        <div className={style.signup}>
            <h1>Sign Up</h1>
            <form onSubmit={handleNewReg}>
                <input
                    placeholder="Name"
                    name="name"
                    onChange={handleChangeRegName}
                />
                <input
                    placeholder="Email"
                    name="email"
                    onChange={handleChangeRegEmail}
                />
                <input
                    placeholder="Password"
                    name="password"
                    onChange={handleChangeRegPassword}
                />
                <input
                    placeholder="Re-type Password"
                    name="password2"
                    onChange={handleChangeRegPassword2}
                />
                <br />
                <button type="submit">Confirm</button>
            </form>
        </div>
    );
};

export default Signup;
