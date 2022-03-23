import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import authReducer from "./authSlice";
import * as Toast from "../components/common/Toast";
const httpErrorHandlerMiddleware = (store) => (next) => (action) => {
    if (!action.error) return next(action);
    Toast.error(action.error.message);

    // if (!Number.isInteger(action.message)) return next(action);
    // switch (action) {
    //     case 401:
    //     case 402:
    //     case 403:
    //     case 409:
    //     case 500:
    //         console.log("Catched in error handler middleware:::", action);
    //         console.log(Toast);
    //         Toast.error({ message: action });
    //         break;
    //     default:
    //         console.log("Un-catched status code:::", action);
    //         break;
    // }
};

export const store = configureStore({
    reducer: { product: productReducer, auth: authReducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(httpErrorHandlerMiddleware),
});
