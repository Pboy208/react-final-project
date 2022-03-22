import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
        userName: "",
    },
    reducers: {
        logIn(state, action) {
            state.isLoggedIn = true;
            state.userName = action.payload.userName;
        },
        logOut(state) {
            state.isLoggedIn = false;
            state.userName = "";
        },
    },
});

export default authSlice.reducer;

export const { logIn, logOut } = authSlice.actions;
