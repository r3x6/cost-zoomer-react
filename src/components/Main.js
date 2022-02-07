import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import styles from "./Main.module.css";

import Sidebar from "./Sidebar";
import CostEstimator from "./main/CostEstimator";
import Overview from "./main/Overview";
import CostBreakdowns from "./main/CostBreakdowns";
import MyTrips from "./main/MyTrips";
import AddTrips from "./main/AddTrips";
import Settings from "./main/Settings";

const Main = () => {
    return (
        <div>
            <div className={styles.sidebar}>
                <Sidebar />
            </div>
            <div className={styles.routes}>
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate replace to="/overview" />}
                    />
                    <Route path="/estimatecost" element={<CostEstimator />} />
                    <Route path="/overview" element={<Overview />} />
                    <Route
                        path="/costbreakdowns"
                        element={<CostBreakdowns />}
                    />
                    <Route path="/mytrips" element={<MyTrips />} />
                    <Route path="/addtrips" element={<AddTrips />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </div>
        </div>
    );
};

export default Main;
