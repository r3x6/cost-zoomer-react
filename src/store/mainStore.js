import { configureStore } from "@reduxjs/toolkit";

import dashboardReducer from "./dashboard";
import signUpReducer from "./signup";
import loginReducer from "./login";
import addTripsReducer from "./addTrips";
import myTripsReducer from "./myTrips";

const store = configureStore({
    reducer: {
        dashboard: dashboardReducer,
        signup: signUpReducer,
        login: loginReducer,
        addTrips: addTripsReducer,
        myTrips: myTripsReducer,
    },
});

export default store;
