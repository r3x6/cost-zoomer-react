import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DateTimePicker from "react-datetime-picker";

import { addTripsActions } from "../../store/addTrips";
import { dashboardActions } from "../../store/dashboard";

import style from "../main/AddTrips.module.css";

const AddTrips = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const storeAuth = useSelector((state) => state.dashboard.authState);

    const storeTripTiming = useSelector((state) => state.addTrips.tripTiming);
    const storeTripDist = useSelector((state) => state.addTrips.tripDist);
    const storeTripWaitTime = useSelector(
        (state) => state.addTrips.tripWaitTime
    );
    const storeTripApp = useSelector((state) => state.addTrips.tripApp);
    const storeTripCost = useSelector((state) => state.addTrips.tripCost);

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

        const prepareTripTable = async () => {
            const res = await fetch(`http://127.0.0.1:5000/preparemytrips/`, {
                method: "POST",
            });
            console.log(`Status: ${res.status}, trip data tables prepared.`);
        };
        prepareTripTable();

        // eslint-disable-next-line
    }, []);

    const handleChangeTiming = (e) => {
        console.log(new Date(e));
        console.log(e);
        const timing = e;
        dispatch(addTripsActions.changeTiming(timing));
    };

    const handleChangeDist = (e) => {
        e.preventDefault();
        const dist = e.target.value;
        dispatch(addTripsActions.changeDist(dist));
    };

    const handleChangeWaitTime = (e) => {
        e.preventDefault();
        const waitTime = e.target.value;
        dispatch(addTripsActions.changeWaitTime(waitTime));
    };

    const handleChangeApp = (e) => {
        e.preventDefault();
        const app = e.target.value;
        dispatch(addTripsActions.changeApp(app));
    };

    const handleChangeCost = (e) => {
        e.preventDefault();
        const cost = e.target.value;
        dispatch(addTripsActions.changeCost(cost));
    };

    const handleNewTrip = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem("userId");
        const payload = {
            userId: userId,
            timing: storeTripTiming,
            dist: storeTripDist,
            time: storeTripWaitTime,
            app: storeTripApp,
            cost: storeTripCost,
        };
        console.log(payload);
        const res = await fetch(`http://localhost:5000/newtrip`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        console.log(`Status: ${res.status}, trip added.`);
        const data = await res.json();
        console.log(data.message);
        // window.location.reload(false);
    };

    return (
        <>
            {storeAuth ? (
                <div className={style.addTrips}>
                    <h1>Add a recent trip</h1>
                    <form onSubmit={handleNewTrip}>
                        <DateTimePicker
                            className={style.dateTime}
                            name="timing"
                            value={storeTripTiming}
                            onChange={handleChangeTiming}
                        />
                        <input
                            placeholder="Distance (m)"
                            name="dist"
                            onChange={handleChangeDist}
                        />
                        <input
                            placeholder="Wait Time (mins)"
                            name="waitTime"
                            onChange={handleChangeWaitTime}
                        />
                        <input
                            placeholder="App"
                            name="app"
                            onChange={handleChangeApp}
                        />
                        <input
                            placeholder="Cost"
                            type="number"
                            min="0.00"
                            step="0.01"
                            name="cost"
                            onChange={handleChangeCost}
                        />
                        <br />
                        <button type="submit">Add Trip</button>
                    </form>
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

export default AddTrips;
