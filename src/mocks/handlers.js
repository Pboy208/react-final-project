import { rest } from "msw";
import * as authController from "./controllers/authController";
import * as productController from "./controllers/productController";

export const handlers = [
    //authentication APIs
    rest.post("/token/refresh"),
    rest.post("/login", authController.logIn),
    rest.post("/register", authController.register),

    //products APIs
    rest.get("/products", productController.getProducts),
    rest.get("/product/:id", productController.getProduct),
    rest.post("/product", productController.addProduct),
    rest.put("/product/:id", productController.updateProduct),
    rest.delete("/product/:id", productController.deleteProduct),
];
