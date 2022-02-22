import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DateTimePicker from "react-datetime-picker";

import { myTripsActions } from "../../store/myTrips";
import { dashboardActions } from "../../store/dashboard";

import style from "../main/MyTrips.module.css";

const MyTrips = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const storeAuth = useSelector((state) => state.dashboard.authState);
    const storeUserTrips = useSelector((state) => state.myTrips.userTrips);

    useEffect(() => {
        // CALL BACKEND API HERE

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

        const getUserTrips = async () => {
            if (localStorage.getItem("userId")) {
                const userId = localStorage.getItem("userId");
                const payload = {
                    userId: userId,
                };
                const res = await fetch(
                    `http://127.0.0.1:5000/selectusertrips/`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(payload),
                    }
                );
                console.log(`Status: ${res.status}, user trip data obtained.`);
                const data = await res.json();
                const tripData = data.data.map((x, y) => {
                    return (
                        <tr>
                            <td>{y + 1}</td>
                            <td>{`${new Date(x.timing)}`}</td>
                            <td>{x.distance + " m"}</td>
                            <td>{x.wait_time + " min"}</td>
                            <td>{x.app}</td>
                            <td>{x.cost}</td>
                        </tr>
                    );
                });
                dispatch(myTripsActions.updateUserTrips(tripData));
                return data.data;
            }
        };
        getUserTrips();

        // eslint-disable-next-line
    }, []);

    return (
        <>
            {storeAuth ? (
                <div className={style.myTrips}>
                    <h1>Your Trips</h1>
                    <table className={style.table}>
                        <thead>
                            <tr>
                                <th>Row</th>
                                <th>Time</th>
                                <th>Distance</th>
                                <th>Waiting Time</th>
                                <th>App Used</th>
                                <th>Cost</th>
                            </tr>
                        </thead>
                        <tbody>{storeUserTrips}</tbody>
                    </table>
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

export default MyTrips;
