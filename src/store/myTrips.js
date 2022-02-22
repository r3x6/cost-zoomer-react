import { createSlice } from "@reduxjs/toolkit";

const myTripsSlice = createSlice({
    name: "userTrips",
    initialState: {
        // INPUT STATES REQUIRED FOR THIS PAGE
        userTrips: [],
        tripSelection: "",
        deleteTrigger: false,
        editTiming: "",
        editDist: "",
        editWaitTime: "",
        editApp: "",
        editCost: "",
    },
    reducers: {
        // PUT REDUCERS FOR THIS PAGE HERE
        updateUserTrips(state, action) {
            state.userTrips = action.payload;
        },
        changeTripSelection(state, action) {
            state.tripSelection = action.payload;
            console.log(state.tripSelection);
        },
        changeDeleteTrigger(state, action) {
            state.deleteTrigger = action.payload;
        },
        changeEditTiming(state, action) {
            state.editTiming = action.payload;
        },
        changeEditDist(state, action) {
            state.editDist = action.payload;
        },
        changeEditWaitTime(state, action) {
            state.editWaitTime = action.payload;
        },
        changeEditApp(state, action) {
            state.editApp = action.payload;
        },
        changeEditCost(state, action) {
            state.editCost = action.payload;
        },
    },
});

export const myTripsActions = myTripsSlice.actions;

export default myTripsSlice.reducer;
