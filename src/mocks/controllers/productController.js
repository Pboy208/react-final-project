/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
import * as mock from 'mocks/mockForTesting';
import { controllerWrapper } from '../utils/utilFunction';
import * as Product from '../models/productModel';
import { verifyToken } from '../models/authenModel';

const getRequestParams = (req) => {
  const sortBy = req.url.searchParams.getAll('sortBy')[0];
  const search = req.url.searchParams.getAll('search')[0] || null;
  return { sortBy, search };
};

const getTokenFromRequest = (req) =>
  req.headers._headers.authorization.split(' ')[1];

const getSortFormula = (sortBy) => {
  switch (sortBy) {
    case 'PRICE_DECREASE':
      return (a, b) => b.price - a.price;
    case 'PRICE_INCREASE':
      return (a, b) => a.price - b.price;
    default:
      // for most recently added item first
      return (a, b) => b.createdTimestamp - a.createdTimestamp;
  }
};

const hasSearch = (title, search) => {
  const titleWords = title.split(' ');
  const searchWords = search.split(' ');

  for (let i = 0; i < titleWords.length; i++) {
    for (let j = 0; j < searchWords.length; j++) {
      if (titleWords[i].toLowerCase() === searchWords[j].toLowerCase()) {
        return true;
      }
    }
  }
  return false;
};

export const getProducts = controllerWrapper(async (req, res, ctx) => {
  if (process.env.NODE_ENV === 'test') {
    const { sortBy, search } = getRequestParams(req);
    console.log(sortBy, search);
    if (search)
      return res(
        ctx.json({ message: 'Get success', data: mock.searchedProductList }),
      );
    if (sortBy === 'PRICE_DECREASE')
      return res(
        ctx.json({
          message: 'Get success',
          data: mock.priceDecreaseProductList,
        }),
      );
    return res(
      ctx.json({
        message: 'Get success',
        data: mock.productList,
      }),
    );
  }
  if (!(await verifyToken(getTokenFromRequest(req))))
    return res(
      ctx.status(401),
      ctx.json({
        message: 'Your session has expired, please login again',
      }),
    );
  const { sortBy, search } = getRequestParams(req);
  let productList = await Product.getAll();
  if (search)
    productList = productList.filter((product) =>
      hasSearch(product.title, search),
    );
  productList.sort(getSortFormula(sortBy));
  return res(ctx.json({ message: 'Get success', data: productList }));
});

export const getProduct = controllerWrapper(async (req, res, ctx) => {
  if (!(await verifyToken(getTokenFromRequest(req))))
    return res(
      ctx.status(401),
      ctx.json({
        message: 'Your session has expired, please login again',
      }),
    );
  const product = await Product.get(req.params.id);
  if (!product)
    return res(
      ctx.status(404),
      ctx.json({
        message: 'Get failed, id not found',
      }),
    );
  return res(ctx.json({ message: 'Get success', data: product }));
});

export const addProduct = controllerWrapper(async (req, res, ctx) => {
  if (!(await verifyToken(getTokenFromRequest(req))))
    return res(
      ctx.status(401),
      ctx.json({
        message: 'Your session has expired, please login again',
      }),
    );
  const product = await Product.add(req.body);
  if (!product)
    return res(
      ctx.status(409),
      ctx.json({
        message: 'Add failed, duplicated item',
      }),
    );
  return res(ctx.json({ message: 'Create success', data: product }));
});

export const updateProduct = controllerWrapper(async (req, res, ctx) => {
  if (!(await verifyToken(getTokenFromRequest(req))))
    return res(
      ctx.status(401),
      ctx.json({
        message: 'Your session has expired, please login again',
      }),
    );
  const product = await Product.update(req.body);
  if (!product)
    return res(
      ctx.status(404),
      ctx.json({
        message: 'Update failed, id not found',
      }),
    );
  return res(ctx.json({ message: 'Update success', data: product }));
});

export const deleteProduct = controllerWrapper(async (req, res, ctx) => {
  if (!(await verifyToken(getTokenFromRequest(req))))
    return res(
      ctx.status(401),
      ctx.json({
        message: 'Your session has expired, please login again',
      }),
    );
  const result = await Product.erase(req.params.id);
  if (!result)
    return res(
      ctx.status(404),
      ctx.json({
        message: 'Delete failed, id not found',
      }),
    );
  return res(ctx.json({ message: 'Delete success' }));
});
