import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "./common/ProductForm";
import { getProduct, updateProduct } from "../store/productSlice";
import { Loader } from "@ahaui/react";
import styled from "styled-components";

const UpdateProduct = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let { byIds, isLoading, error } = useSelector((state) => state.product);
    let product = byIds[productId];
    React.useEffect(() => {
        if (!product) {
            dispatch(getProduct(productId)).unwrap();
        }
    }, [dispatch, productId]);

    const handleFormSubmit = React.useCallback(
        (product) => {
            dispatch(updateProduct(product))
                .unwrap()
                .then(() => navigate("/home"));
        },
        [dispatch, navigate]
    );

    return (
        <>
            <ProductForm product={product} handleFormSubmit={handleFormSubmit} />
            {isLoading && <LoadingSpinner aria-label="Loading" size="large" />}
        </>
    );
};

const LoadingSpinner = styled(Loader)`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
`;

export default UpdateProduct;
