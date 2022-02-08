import React from "react";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
    const navigate = useNavigate();

    return (
        <div>
            <button
                onClick={() => {
                    navigate("/publicestimator");
                }}
            >
                ESTIMATE!
            </button>
        </div>
    );
};

export default TopBar;
