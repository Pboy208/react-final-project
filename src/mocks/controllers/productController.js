import { controllerWrapper } from "../utils/utilFunction";
import * as Product from "../models/productModel";

const getRequestParams = (req) => {
    let filter = parseInt(req.url.searchParams.get("filter"));
    let search = req.url.searchParams.get("search") || null;
    return { filter, search };
};

const getSortFormular = (filter) => {
    switch (filter) {
        case "PRICE_DECREASE":
            return (a, b) => a.price > b.price;
        case "PRICE_INCREASE":
            return (a, b) => a.price < b.price;
        case "CREATED_TIME":
            //for most recently added item first
            return (a, b) => a.createdTimestamp > b.createdTimestamp;
        default:
            throw new Error("Invalid filter");
    }
};

export const getProducts = controllerWrapper(async (req, res, ctx) => {
    const { filter, search } = getRequestParams(req);
    let productList = await Product.getAll();
    // console.log("first productlist", productList, filter, search);
    // if (search) productList = productList.filter((product) => product.title === search);
    // console.log("second productlist", productList);
    productList.sort(getSortFormular(filter));
    // console.log("last productList:::", productList);
    return res(ctx.json({ message: "Success", data: productList }));
});

export const getProduct = controllerWrapper(async (req, res, ctx) => {
    const product = await Product.get(req.params.id);
    if (!product)
        return res(
            ctx.status(401),
            ctx.json({
                message: "Get failed, id not found",
            })
        );
    return res(ctx.json({ message: "Success", data: product }));
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
    return res(ctx.json({ message: "Success", data: product }));
});

export const updateProduct = controllerWrapper(async (req, res, ctx) => {
    const product = await Product.update(req.body);
    if (!product)
        return res(
            ctx.status(401),
            ctx.json({
                message: "Update failed, id not found",
            })
        );
    return res(ctx.json({ message: "Success", data: product }));
});

export const deleteProduct = controllerWrapper(async (req, res, ctx) => {
    const result = await Product.erase(req.params.id);
    if (!result)
        return res(
            ctx.status(401),
            ctx.json({
                message: "Delete failed, id not found",
            })
        );
    return res(ctx.json({ message: "Success" }));
});
