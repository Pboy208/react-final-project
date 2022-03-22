import * as React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Form, Button, Loader } from "@ahaui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema from "../../utils/schemas/product-form-schema";

const imageFallback = "https://banksiafdn.com/wp-content/uploads/2019/10/placeholde-image.jpg";

const ProductForm = ({ product, handleFormSubmit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues: getFieldValues,
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(validationSchema),
        defaultValues: product,
    });

    const isLoading = true;
    const imageUrl = getFieldValues("imageUrl");

    const isPriceInvalid = !!errors.price;
    const isImageUrlInvalid = !!errors.imageUrl;
    const isTitleInvalid = !!errors.title;

    return (
        <Wrapper>
            <RegisterForm onSubmit={handleSubmit(handleFormSubmit)}>
                <Form.Group style={{ width: "100%" }} controlId="productForm.title">
                    <Form.Label>Title</Form.Label>
                    <Form.Input
                        type="text"
                        isInvalid={isTitleInvalid}
                        {...register("title")}
                    ></Form.Input>
                    <Form.Feedback type="invalid">{errors?.title?.message}</Form.Feedback>
                </Form.Group>
                <Form.Group style={{ width: "100%" }} controlId="productForm.imageUrl">
                    <Form.Label>Image url</Form.Label>
                    <Form.Input
                        type="text"
                        isInvalid={isImageUrlInvalid}
                        {...register("imageUrl")}
                    ></Form.Input>
                    <Form.Feedback type="invalid">{errors?.imageUrl?.message}</Form.Feedback>
                </Form.Group>
                <Form.Group style={{ width: "100%" }} controlId="productForm.price">
                    <Form.Label>Price</Form.Label>
                    <Form.Input
                        type="text"
                        isInvalid={isPriceInvalid}
                        {...register("price")}
                    ></Form.Input>
                    <Form.Feedback type="invalid">{errors?.price?.message}</Form.Feedback>
                </Form.Group>
                <Button size={"small"} variant="primary" style={{ width: "10%" }}>
                    <Button.Label style={{ fontWeight: "500" }}>
                        {isLoading ? <Loader aria-label="Loading" size="small" /> : "Login"}
                    </Button.Label>
                </Button>
            </RegisterForm>
            <ProductImage src={isImageUrlInvalid || !imageUrl ? imageFallback : imageUrl} />
        </Wrapper>
    );
};

const ProductImage = styled.img`
    width: 40%;
    height: 100%;
    object-fit: cover;
`;

const RegisterForm = styled.form`
    height: 100%;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const Wrapper = styled.div`
    display: flex;
    min-height: 100%;
    width: 100%;
    border: 1px solid;
    margin: 40px auto;
    padding: 60px;
    gap: 40px;
    justify-content: center;
    align-items: center;
`;
export default ProductForm;
