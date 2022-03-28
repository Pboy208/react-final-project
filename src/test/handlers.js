import { rest } from 'msw';
import * as authController from './controllers/authController';
import * as productController from './controllers/productController';

export const handlers = [
  rest.post('http://localhost:3000/login', authController.logIn),
  rest.post('http://localhost:3000/register', authController.register),
  rest.get('http://localhost:3000/products', productController.getProducts),
  rest.get('http://localhost:3000/product/:id', productController.getProduct),
  rest.post('http://localhost:3000/product', productController.addProduct),
  rest.put(
    'http://localhost:3000/product/:id',
    productController.updateProduct,
  ),
  rest.delete(
    'http://localhost:3000/product/:id',
    productController.deleteProduct,
  ),
];
