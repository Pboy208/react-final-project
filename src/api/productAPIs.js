import { createRequest } from "../utils/request";

export const getProductList = async (params = { sortBy: "CREATED_TIME" }) =>
    await createRequest({
        endpoint: "/products",
        method: "GET",
        params,
        token: true
    });

export const getProduct = async (id) =>
    await createRequest({
        endpoint: `/product/${id}`,
        method: "GET",
        token: true

    });

export const addProduct = async (addInfo) =>
    await createRequest({
        endpoint: `/product/`,
        body: addInfo,
        method: "POST",
        token: true

    });

export const updateProduct = async (updateInfo) =>
    await createRequest({
        endpoint: `/product/${updateInfo.id}`,
        body: updateInfo,
        method: "PUT",
        token: true

    });

export const deleteProduct = async (id) =>
    createRequest({
        endpoint: `/product/${id}`,
        method: "DELETE",
        token: true
    });