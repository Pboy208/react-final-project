import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { normalize } from "normalizr";
import * as normalizerSchema from "../utils/schemas/normalizr-schema";
import { thunkWrapper } from "../utils/utilFunction";
import * as productApi from "../api/productApi";

const productSlice = createSlice({
    name: "product",
    initialState: {
        byIds: {},
        ids: [],
    },
    reducers: {
        replaceProductList(state, action) {
            state.byIds = action.payload.byIds;
            state.ids = action.payload.ids;
        },
        addProduct(state, action) {
            state.byIds = { ...state.byIds, ...action.payload.byIds };
            state.ids = [...state.ids, ...action.payload.ids];
        },
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
});

export const getProductListThunk = thunkWrapper((filter, search) => async (dispatch) => {
    return productApi.getProductList().then(async (response) => {
        const data = response.data;
        const normalizedData = normalize(data, normalizerSchema.arrayOfProduct);

        const normalizedProductList = {
            byIds: normalizedData.entities.product,
            ids: normalizedData.result,
        };
        dispatch(productSlice.actions.replaceProductList(normalizedProductList));
        return data;
    });
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
