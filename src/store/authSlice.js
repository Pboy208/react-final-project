import { createSlice } from "@reduxjs/toolkit";
import decode from "jwt-decode";
import * as authApi from "../api/authApi";
import { thunkWrapper } from "../utils/utilFunction";

const initialState = {
    isLoggedIn: false,
    userName: "",
};

const isTokenValid = (token) => {
    if (!token) return false;
    const decodedToken = decode(token);
    const remainTimeInSeconds = decodedToken.exp - Math.floor(Date.now() / 1000);
    return remainTimeInSeconds > 0 ? true : false;
};

const token = localStorage.getItem("token");

if (isTokenValid(token)) {
    initialState.isLoggedIn = true;
    initialState.userName = decode(token).userName;
    console.log("set user", initialState.userName);
}

const authSlice = createSlice({
    name: "auth",
    initialState,
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

export const loginThunk = thunkWrapper((loginInfo) => async (dispatch) => {
    const response = await authApi.login(loginInfo);
    if (!response.ok) throw response.status;

    const token = (await response.json()).data;
    localStorage.setItem("token", token);

    dispatch(authSlice.actions.logIn(loginInfo));
});

export default authSlice.reducer;

export const { logIn, logOut } = authSlice.actions;
