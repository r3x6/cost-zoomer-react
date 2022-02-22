import { createSlice } from "@reduxjs/toolkit";

const signUpSlice = createSlice({
    name: "signup",
    initialState: {
        // INPUT STATES REQUIRED FOR THIS PAGE
        regName: "",
        regEmail: "",
        regPassword: "",
        regPassword2: "",
    },
    reducers: {
        // PUT REDUCERS FOR THIS PAGE HERE
        changeRegName(state, action) {
            state.regName = action.payload;
        },
        changeRegEmail(state, action) {
            state.regEmail = action.payload;
        },
        changeRegPassword(state, action) {
            state.regPassword = action.payload;
        },
        changeRegPassword2(state, action) {
            state.regPassword2 = action.payload;
        },
    },
});

export const signUpActions = signUpSlice.actions;

export default signUpSlice.reducer;
