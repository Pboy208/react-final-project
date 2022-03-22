import * as React from "react";
import ProductForm from "./common/ProductForm";

const initialProduct = {
    price: 0,
    title: "",
    imageUrl: "",
};

const AddProduct = () => {
    const handleFormSubmit = React.useCallback((product) => {
        console.log("Add product saved", product);
    }, []);

    return <ProductForm product={initialProduct} handleFormSubmit={handleFormSubmit} />;
};

export default AddProduct;
