/* eslint-disable no-param-reassign */
/* eslint-disable no-promise-executor-return */
/* eslint-disable no-return-assign */
import { v4 as uuid } from 'uuid';
import { getProductStore } from '../database/indexedDB';

export const getAll = async () => {
  const store = await getProductStore();
  const query = store.getAll();

  let resolvePromise;
  const promise = new Promise((resolve) => (resolvePromise = resolve));

  query.onsuccess = async () => {
    const productList = query.result;
    if (!productList) return resolvePromise([]);
    return resolvePromise(productList);
  };
  return promise;
};

export const get = async (id) => {
  const store = await getProductStore();
  const query = store.get(id);

  let resolvePromise;
  const promise = new Promise((resolve) => (resolvePromise = resolve));

  query.onsuccess = async () => {
    const product = query.result;
    if (!product) return resolvePromise(null);
    return resolvePromise(product);
  };
  return promise;
};

export const add = async (product) => {
  product.id = uuid();
  product.createdTimestamp = Date.now();

  const store = await getProductStore();
  const query = store.put(product);

  let resolvePromise;
  const promise = new Promise((resolve) => (resolvePromise = resolve));

  query.onsuccess = async () => {
    const { result } = query;
    if (!result) return resolvePromise(false);
    return resolvePromise(product);
  };
  return promise;
};

export const update = async (product) => {
  const store = await getProductStore();
  const query = store.get(product.id);

  let resolvePromise;
  const promise = new Promise((resolve) => (resolvePromise = resolve));

  query.onsuccess = async () => {
    if (!product) return resolvePromise(false);
    product.createdTimestamp = Date.now();
    query.result.createdTimestamp = Date.now();
    query.result.title = product.title;
    query.result.price = product.price;
    query.result.imageUrl = product.imageUrl;
    store.put(query.result);
    return resolvePromise(query.result);
  };
  return promise;
};

export const erase = async (id) => {
  const store = await getProductStore();
  const query = store.delete(id);

  let resolvePromise;
  const promise = new Promise((resolve) => (resolvePromise = resolve));

  query.onsuccess = async () => {
    resolvePromise(true);
  };
  query.onerror = async () => {
    resolvePromise(false);
  };
  return promise;
};
