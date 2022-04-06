import { get, post, put, del } from 'utils/request';

export const getProductList = (params = { sortBy: 'CREATED_TIME' }) =>
  get('/products', { params });

export const getProduct = (id) => get(`/product/${id}`);

export const addProduct = (addInfo) => post('/product', { body: addInfo });

export const updateProduct = (updateInfo) =>
  put(`/product/${updateInfo.id}`, { body: updateInfo });

export const deleteProduct = (id) => del(`/product/${id}`);
