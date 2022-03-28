import { token } from '../../utils/test';
import * as productListJSON from './productList.json';

const { productList } = productListJSON;

const verifyToken = (givenToken) => givenToken === token;

const getRequestParams = (req) => {
  const sortBy = req.url.searchParams.getAll('sortBy')[0];
  const search = req.url.searchParams.getAll('search')[0] || null;
  return { sortBy, search };
};

const getTokenFromRequest = (req) =>
  // eslint-disable-next-line dot-notation
  req.headers['_headers'].authorization.split(' ')[1];

const getSortFormula = (sortBy) => {
  switch (sortBy) {
    case 'PRICE_DECREASE':
      return (a, b) => b.price - a.price;
    case 'PRICE_INCREASE':
      return (a, b) => a.price - b.price;
    default:
      //for most recently added item first
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

export const getProducts = async (req, res, ctx) => {
  if (!verifyToken(getTokenFromRequest(req)))
    return res(
      ctx.status(401),
      ctx.json({
        message: 'Your session has expired, please login again',
      }),
    );
  const { sortBy, search } = getRequestParams(req);
  let fetchedProducts = [...productList];
  if (search)
    fetchedProducts = fetchedProducts.filter((product) =>
      hasSearch(product.title, search),
    );
  fetchedProducts.sort(getSortFormula(sortBy));
  return res(ctx.json({ message: 'Get success', data: fetchedProducts }));
};

export const getProduct = async (req, res, ctx) => {
  if (!verifyToken(getTokenFromRequest(req)))
    return res(
      ctx.status(401),
      ctx.json({
        message: 'Your session has expired, please login again',
      }),
    );
  const product = productList.find((product) => product.id === req.params.id);
  return res(ctx.json({ message: 'Get success', data: product }));
};

export const addProduct = async (req, res, ctx) => {
  if (!(await verifyToken(getTokenFromRequest(req))))
    return res(
      ctx.status(401),
      ctx.json({
        message: 'Your session has expired, please login again',
      }),
    );
  const product = [req.body, ...productList];
  return res(ctx.json({ message: 'Create success', data: product }));
};

export const updateProduct = async (req, res, ctx) => {
  if (!verifyToken(getTokenFromRequest(req)))
    return res(
      ctx.status(401),
      ctx.json({
        message: 'Your session has expired, please login again',
      }),
    );
  return res(ctx.json({ message: 'Update success', data: req.body }));
};

export const deleteProduct = async (req, res, ctx) => {
  if (!verifyToken(getTokenFromRequest(req)))
    return res(
      ctx.status(401),
      ctx.json({
        message: 'Your session has expired, please login again',
      }),
    );
  return res(ctx.json({ message: 'Delete success' }));
};
