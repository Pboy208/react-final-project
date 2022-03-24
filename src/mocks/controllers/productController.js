import { controllerWrapper } from "../utils/utilFunction";
import * as Product from "../models/productModel";

const getRequestParams = (req) => {
    let sortBy = req.url.searchParams.getAll("sortBy")[0];
    let search = req.url.searchParams.getAll("search")[0] || null;
    return { sortBy, search };
};

const getSortFormula = (sortBy) => {
    switch (sortBy) {
        case "PRICE_DECREASE":
            return (a, b) => b.price - a.price;
        case "PRICE_INCREASE":
            return (a, b) => a.price - b.price;
        default:
            //for most recently added item first
            return (a, b) => b.createdTimestamp - a.createdTimestamp;
    }
};

const hasSearch = (title, search) => {
    const titleWords = title.split(" ");
    const searchWords = search.split(" ");

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
    const { sortBy, search } = getRequestParams(req);
    let productList = await Product.getAll();
    if (search) productList = productList.filter((product) => hasSearch(product.title, search));
    productList.sort(getSortFormula(sortBy));
    return res(ctx.json({ message: "Get success", data: productList }));
});

export const getProduct = controllerWrapper(async (req, res, ctx) => {
    const product = await Product.get(req.params.id);
    if (!product)
        return res(
            ctx.status(404),
            ctx.json({
                message: "Get failed, id not found",
            })
        );
    return res(ctx.json({ message: "Get success", data: product }));
});

export const addProduct = controllerWrapper(async (req, res, ctx) => {
    const product = await Product.add(req.body);
    if (!product)
        return res(
            ctx.status(409),
            ctx.json({
                message: "Add failed, duplicated item",
            })
        );
    return res(ctx.json({ message: "Create success", data: product }));
});

export const updateProduct = controllerWrapper(async (req, res, ctx) => {
    const product = await Product.update(req.body);
    if (!product)
        return res(
            ctx.status(404),
            ctx.json({
                message: "Update failed, id not found",
            })
        );
    return res(ctx.json({ message: "Update success", data: product }));
});

export const deleteProduct = controllerWrapper(async (req, res, ctx) => {
    const result = await Product.erase(req.params.id);
    if (!result)
        return res(
            ctx.status(404),
            ctx.json({
                message: "Delete failed, id not found",
            })
        );
    return res(ctx.json({ message: "Delete success" }));
});
