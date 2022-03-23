import * as Authen from "../models/authenModel";
import { controllerWrapper } from "../utils/utilFunction";

export const logIn = controllerWrapper(async (req, res, ctx) => {
    const logInInfo = req.body;
    const token = await Authen.logIn(logInInfo);
    if (!token)
        return res(
            ctx.status(401),
            ctx.json({
                message: "Login failed",
            })
        );
    return res(ctx.json({ message: "Success", data: token }));
});

export const register = controllerWrapper(async (req, res, ctx) => {
    const registerInfo = req.body;
    try {
        await Authen.register(registerInfo);
        return res(ctx.json({ message: "Success" }));
    } catch (error) {
        return res(
            ctx.status(409),
            ctx.json({
                message: "Register failed, email has already been used",
            })
        );
    }
});