/* eslint-disable import/prefer-default-export */
import { rest } from 'msw';
import * as authController from './controllers/authController';
import * as productController from './controllers/productController';
import { BASE_URL } from '../constants';

export const handlers = [
  // authentication APIs
  rest.post(`${BASE_URL}/token/refresh`),
  rest.post(`${BASE_URL}/login`, authController.logIn),
  rest.post(`${BASE_URL}/register`, authController.register),

  // products APIs
  rest.get(`${BASE_URL}/products`, productController.getProducts),
  rest.get(`${BASE_URL}/product/:id`, productController.getProduct),
  rest.post(`${BASE_URL}/product`, productController.addProduct),
  rest.put(`${BASE_URL}/product/:id`, productController.updateProduct),
  rest.delete(`${BASE_URL}/product/:id`, productController.deleteProduct),
];
