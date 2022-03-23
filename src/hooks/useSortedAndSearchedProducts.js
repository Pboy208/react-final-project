import * as React from "react";
import useAsync from "./useAsync";
import { useDispatch } from "react-redux";
import { getProductList } from "../store/productSlice";

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_SORT_BY":
            return { ...state, sortBy: action.sortBy };
        case "SET_SEARCH":
            return { ...state, search: action.search };
        default:
            return state;
    }
};

const useSortedAndSearchedProducts = (inititalSortBy = "CREATED_TIME", initialSsearch = "") => {
    const { error, status, data: productList, handleRequest } = useAsync();
    const [state, setState] = React.useReducer(reducer, {
        sortBy: inititalSortBy,
        search: initialSsearch,
    });
    const { sortBy, search } = state;
    const dispatch = useDispatch();

    const setSortBy = React.useCallback((sortBy) => {
        console.log("Here");
        setState({ type: "SET_SORT_BY", sortBy });
    }, []);

    const setSearch = React.useCallback((search) => {
        setState({ type: "SET_SEARCH", search });
    }, []);

    React.useEffect(() => {
        // console.log(dispatch(getProductListThunk()));
        console.log("about to dispatch ");
        handleRequest(dispatch(getProductList()).unwrap());
    }, [dispatch, sortBy, handleRequest, search]);

    return { productList, status, error, setSortBy, setSearch, sortBy, search };
};

export default useSortedAndSearchedProducts;
