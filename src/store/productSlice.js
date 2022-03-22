import { createSlice } from "@reduxjs/toolkit";

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

export default productSlice.reducer;
export const { replaceProductList, addProduct, modifyProductList, deleteProduct } =
    productSlice.actions;
