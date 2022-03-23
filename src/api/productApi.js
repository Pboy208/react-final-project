import { createRequest } from "../utils/utilFunction";

export const getProductList = async ({ filter, search } = { filter: "CREATED_TIME" }, token) =>
    await createRequest({
        endpoint: "/products",
        method: "GET",
        params: { filter, search },
    });

export const getProduct = async (id) =>
    await createRequest({
        endpoint: `/product/${id}`,
        method: "GET",
    });

export const addProduct = async (addInfo) =>
    await createRequest({
        endpoint: `/product/`,
        body: addInfo,
        method: "POST",
    });

export const updateProduct = async (updateInfo) =>
    await createRequest({
        endpoint: `/product/${updateInfo.id}`,
        body: updateInfo,
        method: "PUT",
    });

export const deleteProduct = async (id) =>
    createRequest({
        endpoint: `/product/${id}`,
        method: "DELETE",
    });
