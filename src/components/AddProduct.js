import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProduct } from 'store/productSlice';
import * as Toast from 'components/common/Toast';
import ProductForm from './common/ProductForm';
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
      .then(() => {
        Toast.success(`${product.title} is added`);
        navigate('/home');
      })
      .catch(console.error);
  }, []);

  return (
    <div data-testid="add-product-page">
      <ProductForm
        product={initialProduct}
        handleFormSubmit={handleFormSubmit}
      />
      <LoadingSpinner isLoading={isLoading} />
    </div>
  );
}

export default AddProduct;
