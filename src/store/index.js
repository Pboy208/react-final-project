import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import authReducer from "./authSlice";

const errorHandlerMiddleware = (store) => (next) => (error, action) => {
    switch (error.status) {
        case 401:
            break;
        case 402:
            break;
        case 403:
            break;
        case 500:
            break;
        default:
            next(action);
            break;
    }
};

export const store = configureStore({
    reducer: { product: productReducer, auth: authReducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(errorHandlerMiddleware),
});
