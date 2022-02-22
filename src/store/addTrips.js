import { createSlice } from "@reduxjs/toolkit";

const addTripsSlice = createSlice({
    name: "addTrips",
    initialState: {
        // INPUT STATES REQUIRED FOR THIS PAGE
        tripTiming: new Date(),
        tripDist: "",
        tripWaitTime: "",
        tripApp: "",
        tripCost: "",
    },
    reducers: {
        // PUT REDUCERS FOR THIS PAGE HERE
        changeTiming(state, action) {
            state.tripTiming = action.payload;
        },
        changeDist(state, action) {
            state.tripDist = action.payload;
        },
        changeWaitTime(state, action) {
            state.tripWaitTime = action.payload;
        },
        changeApp(state, action) {
            state.tripApp = action.payload;
        },
        changeCost(state, action) {
            state.tripCost = action.payload;
        },
    },
});

export const addTripsActions = addTripsSlice.actions;

export default addTripsSlice.reducer;
