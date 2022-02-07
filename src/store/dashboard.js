import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        // INPUT STATES REQUIRED FOR THIS PAGE
        // stateName : value
    },
    reducers: {
        // PUT REDUCERS FOR THIS PAGE HERE
        // reducerName(state, action) {
        //   state.stateName = action.payload;
        // },
    },
});

export const dashboardActions = dashboardSlice.actions;

export default dashboardSlice.reducer;
