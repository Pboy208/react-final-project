import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { normalize } from "normalizr";
import * as normalizerSchema from "../utils/schemas/normalizr-schema";
import { thunkWrapper } from "../utils/utilFunction";
import * as productApi from "../api/productApi";

export const getProductList = createAsyncThunk("product/getList", async (params) => {
    return productApi.getProductList(params);
});

export const getProduct = createAsyncThunk("product/get", async (id) => {
    return productApi.getProduct(id);
});

export const updateProduct = createAsyncThunk("product/update", async (product) => {
    return productApi.updateProduct(product);
});

const productSlice = createSlice({
    name: "product",
    initialState: {
        isLoading: false,
        error: false,
        byIds: {},
        ids: [],
    },
    reducers: {
        deleteProduct(state, action) {
            state.ids = state.ids.filter((id) => id !== action.payload.id);
            delete state.byIds[action.payload.id];
        },
    },
    extraReducers: {
        [getProductList.fulfilled]: (state, action) => {
            const normalizedData = normalize(action.payload.data, normalizerSchema.arrayOfProduct);
            state.byIds = normalizedData.entities.product;
            state.ids = normalizedData.result;
            console.log("here");
        },
        [getProductList.rejected]: (state, action) => {
            console.log("in reducer extra", action);
        },
        [getProduct.fulfilled]: (state, action) => {
            const normalizedData = normalize(action.payload.data, normalizerSchema.product);
            state.byIds = { ...state.byIds, ...normalizedData.entities.product };
            state.ids = [...state.ids, normalizedData.result];
        },
        [getProduct.rejected]: (state, action) => {
            console.log("in reducer extra", action);
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
    },
});

export const addproductThunk = thunkWrapper((product) => async (dispatch) => {
    const response = await productApi.addProduct(product);
    if (!response.ok) throw response.status;

    const newProduct = (await response.json()).data;
    dispatch(productSlice.actions.modifyProductList(newProduct));
});

export const deleteProductThunk = thunkWrapper((id) => async (dispatch) => {
    const response = await productApi.deleteProduct(id);
    if (!response.ok) throw response.status;

    dispatch(productSlice.actions.modifyProductList(id));
});

export default productSlice.reducer;
export const { replaceProductList, addProduct, modifyProductList, deleteProduct } =
    productSlice.actions;
