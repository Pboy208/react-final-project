import * as Yup from "yup";
import authMessage from "../constants/auth-message";

const validationSchema = Yup.object().shape({
    email: Yup.string().required(authMessage.EMAIL_REQUIRED).email(authMessage.EMAIL_INVALID),
    password: Yup.string()
        .required(authMessage.PASSWORD_REQUIRED)
        .min(5, authMessage.PASSWORD_LENGTH_SHORT)
        .max(40, authMessage.PASSWORD_LENGTH_EXCEED),
});

export default validationSchema;
