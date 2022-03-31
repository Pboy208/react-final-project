import { createRequest } from 'utils/request';

export const getProductList = (params = { sortBy: 'CREATED_TIME' }) =>
  createRequest({
    endpoint: '/products',
    method: 'GET',
    params,
    token: true,
  });

export const getProduct = (id) =>
  createRequest({
    endpoint: `/product/${id}`,
    method: 'GET',
    token: true,
  });

export const addProduct = (addInfo) =>
  createRequest({
    endpoint: '/product',
    body: addInfo,
    method: 'POST',
    token: true,
  });

export const updateProduct = (updateInfo) =>
  createRequest({
    endpoint: `/product/${updateInfo.id}`,
    body: updateInfo,
    method: 'PUT',
    token: true,
  });

export const deleteProduct = (id) =>
  createRequest({
    endpoint: `/product/${id}`,
    method: 'DELETE',
    token: true,
  });
