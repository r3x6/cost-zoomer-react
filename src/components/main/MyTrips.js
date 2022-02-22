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
    const storeTripSelection = useSelector(
        (state) => state.myTrips.tripSelection
    );
    const storeDeleteTrigger = useSelector(
        (state) => state.myTrips.deleteTrigger
    );

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

    useEffect(() => {
        // CALL BACKEND API HERE

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
                console.log(data.data);
                const handleTripSelect = (e) => {
                    e.preventDefault();
                    const select = e.target.parentElement.id;
                    dispatch(myTripsActions.changeTripSelection(select));
                };

                const handleDelete = async (e) => {
                    e.preventDefault();
                    const tripId = e.target.parentElement.parentElement.id;

                    const payload = {
                        tripId: tripId,
                    };

                    const res = await fetch(
                        `http://localhost:5000/deletetrip`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(payload),
                        }
                    );
                    console.log(`Status: ${res.status}, trip deleted.`);
                    storeDeleteTrigger
                        ? dispatch(myTripsActions.changeDeleteTrigger(false))
                        : dispatch(myTripsActions.changeDeleteTrigger(true));
                };

                const tripData = data.data.map((x, y) => {
                    return (
                        <>
                            {storeTripSelection !== x.trip_id ? (
                                <tr onClick={handleTripSelect} id={x.trip_id}>
                                    <td>{y + 1}</td>
                                    <td>{`${new Date(x.timing)}`}</td>
                                    <td>{x.distance + " m"}</td>
                                    <td>{x.wait_time + " min"}</td>
                                    <td>{x.app}</td>
                                    <td>{x.cost}</td>
                                    <td>
                                        <button onClick={handleDelete}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ) : (
                                <tr id={x.trip_id} name="selected">
                                    <td>{y + 1}</td>
                                    <td>
                                        <input
                                            name="time"
                                            defaultValue={`${new Date(
                                                x.timing
                                            )}`}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            name="dist"
                                            defaultValue={x.distance}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            name="waitTime"
                                            defaultValue={x.wait_time}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            name="app"
                                            defaultValue={x.app}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            name="cost"
                                            defaultValue={x.cost}
                                        />
                                    </td>
                                    <td>
                                        <button onClick={handleEditSubmit}>
                                            Confirm Edit
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </>
                    );
                });
                dispatch(myTripsActions.updateUserTrips(tripData));
                return data.data;
            }
        };
        getUserTrips();

        // eslint-disable-next-line
    }, [storeTripSelection, storeDeleteTrigger]);

    const handleTripClear = () => {
        const select = "";
        dispatch(myTripsActions.changeTripSelection(select));
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const tripId = document.querySelector("tr[name=selected]").id;
        const timing = document.querySelector("input[name=time]").value;
        const dist = document.querySelector("input[name=dist]").value;
        const time = document.querySelector("input[name=waitTime]").value;
        const app = document.querySelector("input[name=app]").value;
        const cost = document.querySelector("input[name=cost]").value;

        const payload = {
            tripId: tripId,
            timing: new Date(timing).toISOString(),
            dist: dist,
            time: time,
            app: app,
            cost: cost,
        };

        console.log(payload);

        const res = await fetch(`http://localhost:5000/updatetrip`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        console.log(`Status: ${res.status}, trip updated.`);
        const data = await res.json();
        console.log(data.message);

        handleTripClear();
    };

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
                                <th>Action</th>
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
