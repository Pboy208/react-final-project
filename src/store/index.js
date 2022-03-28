import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import authReducer from "./authSlice";
import * as Toast from "../components/common/Toast";
const httpErrorHandlerMiddleware = (store) => (next) => (action) => {
    if (!action.error) return next(action);
    const { message, code } = action.error;
    switch (code) {
        case "401":
            store.dispatch({
                type: "auth/logout",
            });
        case "400":
        case "404":
        case "409":
        case "500":
            return Toast.error(message);
        default:
            console.log("Un-catched status code:::", action);
            return Toast.error("unknown error");
    }
};

const httpStatusHandlerMiddleware = (store) => (next) => (action) => {
    console.log(action);
    const status = action.meta?.requestStatus || null;
    if (!status) return next(action);
    const stateName = action.type.split("/")[0];
    store.dispatch({
        type: `${stateName}/setIsLoading`,
        payload: status === "pending" ? true : false,
    });
    next(action);
};

export const store = configureStore({
    reducer: { product: productReducer, auth: authReducer },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(httpStatusHandlerMiddleware, httpErrorHandlerMiddleware),
});
