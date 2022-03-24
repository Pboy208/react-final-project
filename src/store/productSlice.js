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
        error: false,
        byIds: {},
        ids: [],
    },
    reducers: {},
    extraReducers: {
        [getProductList.fulfilled]: (state, action) => {
            const normalizedData = normalize(action.payload.data, normalizerSchema.arrayOfProduct);
            state.byIds = normalizedData.entities.product;
            state.ids = normalizedData.result;
            console.log("here");
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
            state.isLoading = false;
        },
        [updateProduct.pending]: (state, action) => {
            state.isLoading = true;
        },
        [updateProduct.rejected]: (state, action) => {
            state.error = action.error;
            state.isLoading = false;
        },
        [deleteProduct.fulfilled]: (state, action) => {
            state.ids = state.ids.filter((id) => id !== action.payload.id);
            delete state.byIds[action.payload.id];
            state.isLoading = false;
        },
        [addProduct.fulfilled]: (state, action) => {
            const product = action.payload.data;
            state.byIds = { ...state.byIds, [product.id]: product };
            state.ids = [...state.ids, ...product.id];
            state.isLoading = false;
        },
        [deleteProduct.pending]: (state, action) => {
            state.isLoading = true;
        },
        [deleteProduct.rejected]: (state, action) => {
            state.error = action.error;
            state.isLoading = false;
        },
    },
});

export default productSlice.reducer;
