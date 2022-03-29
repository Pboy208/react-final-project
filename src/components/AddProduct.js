import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProductForm from './common/ProductForm';
import { addProduct } from '../store/productSlice';
import LoadingSpinner from './common/LoadingSpinner';

const initialProduct = {
  price: 0,
  title: '',
  imageUrl: '',
};

function AddProduct() {
  const { isLoading } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = React.useCallback((product) => {
    dispatch(addProduct(product))
      .unwrap()
      .then(() => navigate('/home'))
      .catch(console.error);
  }, []);

  return (
    <>
      <ProductForm
        product={initialProduct}
        handleFormSubmit={handleFormSubmit}
      />
      <LoadingSpinner isLoading={isLoading} />
    </>
  );
}

export default AddProduct;
