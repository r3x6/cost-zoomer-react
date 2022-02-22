import React from "react";
import { useNavigate } from "react-router-dom";

import style from "./Sidebar.module.css";

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <div className={style.sidebarBox}>
            <button
                onClick={() => {
                    navigate(`/main`);
                }}
            >
                Overview
            </button>
            <button
                onClick={() => {
                    navigate(`/main/mytrips`);
                }}
            >
                My Trips
            </button>
            <button
                onClick={() => {
                    navigate(`/main/addtrips`);
                }}
            >
                Add Trips
            </button>
            <button
                onClick={() => {
                    navigate(`/main/costbreakdowns`);
                }}
            >
                Cost Breakdowns
            </button>
            <button
                onClick={() => {
                    navigate(`/main/estimatecost`);
                }}
            >
                Cost Estimator
            </button>
            <button
                onClick={() => {
                    navigate(`/main/settings`);
                }}
            >
                Settings
            </button>
            <button
                onClick={() => {
                    localStorage.clear();
                    navigate(`/`);
                }}
            >
                Logout
            </button>
        </div>
    );
};

export default Sidebar;
