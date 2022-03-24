import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductForm from "./common/ProductForm";
import { getProduct } from "../store/productSlice";
// const initialProduct = {
//     id: "Testing id",
//     price: 5200000,
//     title: "ULTRABOOST 22",
//     imageUrl:
//         "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fbaf991a78bc4896a3e9ad7800abcec6_9366/ULTRABOOST_22_DJen_GZ0127_01_standard.jpg",
//     createdTimestamp: new Date(1647869066410),
// };

const UpdateProduct = () => {
    const { productId } = useParams();
    let product = useSelector((state) => state.product.byIds?.[productId]);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (!product) {
            dispatch(getProduct(productId)).unwrap();
        }
    }, [dispatch, productId]);

    const handleFormSubmit = React.useCallback((product) => {
        console.log("Update product saved", product);
    }, []);

    return <ProductForm product={product} handleFormSubmit={handleFormSubmit} />;
};

export default UpdateProduct;
