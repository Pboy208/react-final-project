import { createRequest } from "../utils/utilFunction";

export const login = (loginInfo) =>
    createRequest({
        endpoint: "/login",
        body: loginInfo,
        method: "POST",
    });

export const register = (registerInfo) =>
    createRequest({
        endpoint: "/register",
        body: registerInfo,
        method: "POST",
    });
