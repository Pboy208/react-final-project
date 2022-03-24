import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
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

const useSortedAndSearchedProducts = (initialSortBy = "CREATED_TIME", initialSearch = "") => {
    const { isLoading, byIds, ids, isFirstLoad } = useSelector((state) => state.product);
    const [state, setState] = React.useReducer(reducer, {
        sortBy: initialSortBy,
        search: initialSearch,
    });
    const productList = ids.map((id) => byIds[id]);
    const { sortBy, search } = state;
    const dispatch = useDispatch();

    const setSortBy = React.useCallback((sortBy) => {
        setState({ type: "SET_SORT_BY", sortBy });
    }, []);

    const setSearch = React.useCallback((search) => {
        setState({ type: "SET_SEARCH", search });
    }, []);

    React.useEffect(() => {
        const debounce = setTimeout(() => {
            console.log("still fetch", productList);
            dispatch(getProductList({ sortBy, search })).unwrap();
        }, 500);
        if (isFirstLoad) clearTimeout(debounce);
        return () => clearTimeout(debounce);
    }, [dispatch, sortBy, search]);

    return { productList, isLoading, setSortBy, setSearch, sortBy, search };
};

export default useSortedAndSearchedProducts;
