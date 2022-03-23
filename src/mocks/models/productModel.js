import { getProductStore } from "../database/indexedDB";
import { v4 as uuid } from "uuid";

export const getAll = async () => {
    const store = await getProductStore();
    const query = store.getAll();

    let resolvePromise;
    const promise = new Promise((resolve) => (resolvePromise = resolve));

    query.onsuccess = async () => {
        const productList = query.result;
        if (!productList) resolvePromise([]);
        resolvePromise(productList);
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
        if (!product) resolvePromise(null);
        resolvePromise(product);
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
        const result = query.result;
        console.log("on query add success", result);
        if (!result) resolvePromise(false);
        resolvePromise(product);
    };
    return promise;
};

export const update = async (product) => {
    const store = await getProductStore();
    const query = store.get(product.id);

    let resolvePromise;
    const promise = new Promise((resolve) => (resolvePromise = resolve));

    query.onsuccess = async () => {
        if (!product) resolvePromise(false);
        product.createdTimestamp = Date.now();
        query.result.createdTimestamp = Date.now();
        query.result.title = product.title;
        query.result.price = product.price;
        query.result.imageUrl = product.imageUrl;
        store.put(query.result);
        resolvePromise(query.result);
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
