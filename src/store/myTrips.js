import { createSlice } from "@reduxjs/toolkit";

const myTripsSlice = createSlice({
    name: "userTrips",
    initialState: {
        // INPUT STATES REQUIRED FOR THIS PAGE
        userTrips: [],
    },
    reducers: {
        // PUT REDUCERS FOR THIS PAGE HERE
        updateUserTrips(state, action) {
            state.userTrips = action.payload;
        },
    },
});

export const myTripsActions = myTripsSlice.actions;

export default myTripsSlice.reducer;
