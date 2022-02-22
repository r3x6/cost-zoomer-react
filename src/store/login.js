import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: "login",
    initialState: {
        // INPUT STATES REQUIRED FOR THIS PAGE
        loginEmail: "",
        loginPassword: "",
    },
    reducers: {
        // PUT REDUCERS FOR THIS PAGE HERE
        changeLoginEmail(state, action) {
            state.loginEmail = action.payload;
        },
        changeLoginPassword(state, action) {
            state.loginPassword = action.payload;
        },
    },
});

export const loginActions = loginSlice.actions;

export default loginSlice.reducer;
