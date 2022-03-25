import { createRequest } from "../utils/request";

export const login = async (loginInfo) =>
    await createRequest({
        endpoint: "/login",
        body: loginInfo,
        method: "POST",
    });

export const register = async (registerInfo) =>
    await createRequest({
        endpoint: "/register",
        body: registerInfo,
        method: "POST",
    });
