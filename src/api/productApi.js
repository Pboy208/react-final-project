import { createRequest } from "../mocks/utils/utilFunction";

export const getProductList = ({ filter, search } = { filter: "CREATED_TIME" }, token) =>
    createRequest({
        endpoint: "/products",
        method: "GET",
        params: { filter, search },
    });

export const getProduct = (id) =>
    createRequest({
        endpoint: `/product/${id}`,
        method: "GET",
    });

export const addProduct = (addInfo) =>
    createRequest({
        endpoint: `/product/`,
        body: addInfo,
        method: "POST",
    });

export const updateProduct = (updateInfo) =>
    createRequest({
        endpoint: `/product/${updateInfo.id}`,
        body: updateInfo,
        method: "PUT",
    });

export const deleteProduct = (id) =>
    createRequest({
        endpoint: `/product/${id}`,
        method: "DELETE",
    });
