import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { normalize } from "normalizr";
import * as normalizerSchema from "../utils/schemas/normalizrSchemas";
import * as productApi from "../api/productAPIs";

export const getProductList = createAsyncThunk("product/getList", async (params) => {
    return productApi.getProductList(params);
});

export const getProduct = createAsyncThunk("product/get", async (id) => {
    return productApi.getProduct(id);
});

export const updateProduct = createAsyncThunk("product/update", async (product) => {
    console.log("begin update");
    return productApi.updateProduct(product);
});

export const deleteProduct = createAsyncThunk("product/delete", async (id) => {
    return productApi.deleteProduct(id);
});

export const addProduct = createAsyncThunk("product/add", async (product) => {
    return productApi.addProduct(product);
});

const productSlice = createSlice({
    name: "product",
    initialState: {
        isLoading: false,
        byIds: {},
        ids: [],
    },
    reducers: {
        setLoading: (state, action) => {
            console.log("begin set is loading", action.payload);
            state.isLoading = action.payload;
        },
    },
    extraReducers: {
        [getProductList.fulfilled]: (state, action) => {
            const normalizedData = normalize(action.payload.data, normalizerSchema.arrayOfProduct);
            state.byIds = normalizedData.entities.product;
            state.ids = normalizedData.result;
        },
        [getProduct.fulfilled]: (state, action) => {
            const normalizedData = normalize(action.payload.data, normalizerSchema.product);
            state.byIds = { ...state.byIds, ...normalizedData.entities.product };
            state.ids = [...state.ids, normalizedData.result];
        },
        [updateProduct.fulfilled]: (state, action) => {
            const product = action.payload.data;
            if (state.ids.includes(product.id)) {
                state.byIds[product.id] = {
                    ...state.byIds[product.id],
                    ...product,
                };
            }
            state.byIds = { ...state.byIds, [product.id]: product };
            state.ids = [...state.ids, ...product.id];
        },
        [deleteProduct.fulfilled]: (state, action) => {
            state.ids = state.ids.filter((id) => id !== action.payload.id);
            delete state.byIds[action.payload.id];
        },
        [addProduct.fulfilled]: (state, action) => {
            const product = action.payload.data;
            state.byIds = { ...state.byIds, [product.id]: product };
            state.ids = [...state.ids, ...product.id];
        },
    },
});

export default productSlice.reducer;
