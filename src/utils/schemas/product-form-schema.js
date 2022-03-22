import * as Yup from "yup";
import productMessage from "../constants/product-message";

const validationSchema = Yup.object().shape({
    title: Yup.string()
        .required(productMessage.TITLE_REQUIRED)
        .min(5, productMessage.TITLE_LENGTH_SHORT)
        .max(30, productMessage.TITLE_LENGTH_EXCEED),
    imageUrl: Yup.string()
        .required(productMessage.IMAGE_URL_REQUIRED)
        .url(productMessage.IMAGE_URL_INVALID),
    price: Yup.number(productMessage.PRICE_INVALID).required(productMessage.PRICE_REQUIRED),
});
export default validationSchema;
