import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { normalize } from "normalizr";
import * as normalizerSchema from "../utils/schemas/normalizr-schema";
import { thunkWrapper } from "../utils/utilFunction";
import * as productApi from "../api/productApi";

export const getProductList = createAsyncThunk("product/getProductList", async (params) => {
    return productApi.getProductList(params);
});

export const getProduct = createAsyncThunk("product/getProduct", async (id) => {
    return productApi.getProduct(id);
});

const productSlice = createSlice({
    name: "product",
    initialState: {
        byIds: {},
        ids: [],
    },
    reducers: {
        modifyProductList(state, action) {
            if (state.ids.includes(action.payload.id)) {
                state.byIds[action.payload.id] = {
                    ...state.byIds[action.payload.id],
                    ...action.payload,
                };
            }
            state.byIds = { ...state.byIds, [action.payload.id]: action.payload };
            state.ids = [...state.ids, ...action.payload.id];
        },
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
    },
});

export const addproductThunk = thunkWrapper((product) => async (dispatch) => {
    const response = await productApi.addProduct(product);
    if (!response.ok) throw response.status;

    const newProduct = (await response.json()).data;
    dispatch(productSlice.actions.modifyProductList(newProduct));
});

export const updateProductThunk = thunkWrapper((product) => async (dispatch) => {
    const response = await productApi.updateProduct(product);
    if (!response.ok) throw response.status;

    const newProduct = (await response.json()).data;
    dispatch(productSlice.actions.deleteProduct(newProduct));
});

export const deleteProductThunk = thunkWrapper((id) => async (dispatch) => {
    const response = await productApi.deleteProduct(id);
    if (!response.ok) throw response.status;

    dispatch(productSlice.actions.modifyProductList(id));
});

export default productSlice.reducer;
export const { replaceProductList, addProduct, modifyProductList, deleteProduct } =
    productSlice.actions;
