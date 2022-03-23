import * as React from "react";
import useAsync from "./useAsync";
import { useDispatch } from "react-redux";
import { getProductList } from "../store/productSlice";

const useSortedProducts = (filter = "CREATED_TIME", search) => {
    const { error, status, data: productList, handleRequest } = useAsync();

    const dispatch = useDispatch();
    console.log(productList);
    React.useEffect(() => {
        // console.log(dispatch(getProductListThunk()));
        console.log("about to dispatch ");
        handleRequest(dispatch(getProductList()).unwrap());
    }, [dispatch, filter, handleRequest, search]);

    return { productList, status, error };
};

export default useSortedProducts;
