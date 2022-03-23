import * as React from "react";
import useAsync from "./useAsync";
import { useDispatch } from "react-redux";
import { getProductListThunk } from "../store/productSlice";

const useSortedProducts = (filter = "CREATED_TIME", search) => {
    const { error, status, data: productList, handleRequest } = useAsync();

    const dispatch = useDispatch();

    React.useEffect(() => {
        handleRequest(dispatch(getProductListThunk()));
    }, [dispatch, filter, handleRequest, search]);

    return { productList, status, error };
};

export default useSortedProducts;
