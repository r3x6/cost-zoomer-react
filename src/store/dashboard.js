import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        // INPUT STATES REQUIRED FOR THIS PAGE
        authState: false,
    },
    reducers: {
        // PUT REDUCERS FOR THIS PAGE HERE
        updateAuthState(state, action) {
            state.authState = action.payload;
        },
    },
});

export const dashboardActions = dashboardSlice.actions;

export default dashboardSlice.reducer;
