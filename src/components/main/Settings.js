import React from "react";

import { useEffect } from "react";
import { dashboardActions } from "../../store/dashboard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Settings = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const storeAuth = useSelector((state) => state.dashboard.authState);

    useEffect(() => {
        {
            const checkToken = async () => {
                const token = localStorage.getItem("token");
                const payload = {
                    token: token,
                };

                const res = await fetch(`http://127.0.0.1:5000/authtoken/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                });
                if (res.status == 200) {
                    dispatch(dashboardActions.updateAuthState(true));
                } else {
                    dispatch(dashboardActions.updateAuthState(false));
                }
                console.log(`Status: ${res.status}, Authentication Done.`);
            };
            checkToken();
        }
    }, []);
    return (
        <>
            {storeAuth ? (
                <div>
                    <h1>Settings Page</h1>
                </div>
            ) : (
                <div>
                    <h1>You're not logged in.</h1>
                    <br />
                    <h2>Please login to access the app!</h2>
                    <br />
                    <button
                        onClick={() => {
                            navigate(`/login`);
                        }}
                    >
                        Go to login
                    </button>
                </div>
            )}
        </>
    );
};

export default Settings;
