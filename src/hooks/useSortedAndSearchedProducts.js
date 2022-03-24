import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductList } from "../store/productSlice";

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_SORT_BY":
            return { ...state, sortBy: action.sortBy };
        case "SET_SEARCH":
            return { ...state, search: action.search };
        case "SET_JUST_MOUNTED":
            return { ...state, justMounted: false };
        default:
            return state;
    }
};

const useSortedAndSearchedProducts = (initialSortBy = "CREATED_TIME", initialSearch = "") => {
    const { isLoading, byIds, ids, isFirstLoad } = useSelector((state) => state.product);
    const [state, setState] = React.useReducer(reducer, {
        sortBy: initialSortBy,
        search: initialSearch,
        justMounted: true,
    });
    const productList = ids.map((id) => byIds[id]);
    const { sortBy, search, justMounted } = state;
    const dispatch = useDispatch();

    const setSortBy = React.useCallback((sortBy) => {
        setState({ type: "SET_SORT_BY", sortBy });
    }, []);

    const setSearch = React.useCallback((search) => {
        setState({ type: "SET_SEARCH", search });
    }, []);

    React.useEffect(() => {
        const debounce = setTimeout(() => {
            dispatch(getProductList({ sortBy, search })).unwrap();
        }, 500);

        // when user move to other page, and return to this one, we don't want to fetch again
        if (!isFirstLoad && justMounted) {
            setState({ type: "SET_JUST_MOUNTED" });
            clearTimeout(debounce);
        }
        return () => clearTimeout(debounce);
    }, [dispatch, sortBy, search]);

    return { productList, isLoading, setSortBy, setSearch, sortBy, search };
};

export default useSortedAndSearchedProducts;
