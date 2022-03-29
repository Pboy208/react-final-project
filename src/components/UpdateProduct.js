import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ProductForm from './common/ProductForm';
import { getProduct, updateProduct } from '../store/productSlice';
import LoadingSpinner from './common/LoadingSpinner';

function UpdateProduct() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { byIds, isLoading } = useSelector((state) => state.product);
  const product = byIds[productId];

  React.useEffect(() => {
    if (!product) {
      dispatch(getProduct(productId)).unwrap();
    }
  }, [dispatch, product, productId]);

  const handleFormSubmit = React.useCallback(
    (updatedProduct) => {
      dispatch(updateProduct(updatedProduct))
        .unwrap()
        .then(() => navigate('/home'));
    },
    [dispatch, navigate],
  );

  return (
    <>
      <ProductForm product={product} handleFormSubmit={handleFormSubmit} />
      <LoadingSpinner isLoading={isLoading} />
    </>
  );
}

export default UpdateProduct;
