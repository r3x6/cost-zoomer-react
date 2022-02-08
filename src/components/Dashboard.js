import React, { useEffect } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import styles from "./Dashboard.module.css";

// IMPORT NECESSARY COMPONENTS HERE
// import Component from "./fileName";
import TopBar from "./TopBar";
import Login from "./Login";
import Main from "./Main";

import CostEstimator from "./main/CostEstimator";
import Overview from "./main/Overview";
import CostBreakdowns from "./main/CostBreakdowns";
import MyTrips from "./main/MyTrips";
import AddTrips from "./main/AddTrips";
import Settings from "./main/Settings";

const Dashboard = () => {
    // ALLOWS REDUX STORE TO BE ACCESSED

    // CALL STATES TO BE USED FROM STORE
    // const storeStateName = useSelector((state) => state.mainPg.stateName);

    useEffect(() => {
        // CALL BACKEND API HERE
        //
        // const apiAction = async (para) => {
        //   const res = await fetch(
        //     `https://apiURL/${para}`,
        //     { method: "HTML VERB"}
        //   );
        //   const data = await res.json();
        //   return data;
        // };
        //
        // IF NECESSARY, THROW IN REDUCER HERE TO HANDLE FETCHED DATA (THIS IS FOR ONLOAD)
        // const handleData = async () => {
        //   const receivedData = await apiAction("someParameter");
        //   dispatch(mainPgActions.reducerName(receivedData));
        // };
        // handleData();
        //
        // REMOVES DEPENDENCY WARNING (DO NOT REMOVE THE COMMENT FOR NEXT LINE)
        // eslint-disable-next-line
    }, []);

    // OTHER REDUCERS HERE, WITH USEEFFECT TO SPECIFY TRIGGER IF NECESSARY

    // PAGE HTML TEMPLATE WITH COMPONENTS WHERE NECESSARY
    return (
        <div className={styles.container}>
            <div className={styles.topBar}>
                <TopBar />
            </div>
            {/* PARTS THAT CHANGE WITH THE PAGES, ANYTHING U WANNA KEEP STATIC PUT OUTSIDE */}
            <div className={styles.main}>
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate replace to="/login" />}
                    />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/publicestimator"
                        element={<CostEstimator />}
                    />
                    <Route path="/main/*" element={<Main />} />
                </Routes>
                {/* IN OTHER PAGES, USE NAVLINK TO ANY OF THESE SET ROUTES */}
            </div>
        </div>
    );
};
export default Dashboard;
