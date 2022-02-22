import React from "react";
import { useNavigate } from "react-router-dom";

import style from "./TopBar.module.css";

const TopBar = () => {
    const navigate = useNavigate();

    return (
        <div className={style.topBar}>
            <button
                className={style.logo}
                onClick={() => {
                    navigate("/main");
                }}
            />
        </div>
    );
};

export default TopBar;
