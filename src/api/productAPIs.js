import { createRequest } from 'utils/request';

export const getProductList = (params = { sortBy: 'CREATED_TIME' }) =>
  createRequest({
    endpoint: '/products',
    method: 'GET',
    params,
  });

export const getProduct = (id) =>
  createRequest({
    endpoint: `/product/${id}`,
    method: 'GET',
  });

export const addProduct = (addInfo) =>
  createRequest({
    endpoint: '/product',
    body: addInfo,
    method: 'POST',
  });

export const updateProduct = (updateInfo) =>
  createRequest({
    endpoint: `/product/${updateInfo.id}`,
    body: updateInfo,
    method: 'PUT',
  });

export const deleteProduct = (id) =>
  createRequest({
    endpoint: `/product/${id}`,
    method: 'DELETE',
  });
