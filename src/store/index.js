import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import authReducer from "./authSlice";

const httpErrorHandlerMiddleware = (store) => (next) => (action) => {
    if (!Number.isInteger(action)) return next(action);
    switch (action) {
        case 401:
        case 402:
        case 403:
        case 409:
        case 500:
            console.log("Catched in error handler middleware:::", action);
            break;
        default:
            console.log("Un-catched status code:::", action);
            break;
    }
};

export const store = configureStore({
    reducer: { product: productReducer, auth: authReducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(httpErrorHandlerMiddleware),
});
