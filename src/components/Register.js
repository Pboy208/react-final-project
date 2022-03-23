import * as React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Form, Button, Loader } from "@ahaui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema from "../utils/schemas/register-schemas";

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(validationSchema),
    });
    const isLoading = true;

    const isUserNameInvalid = !!errors.userName;
    const isPasswordInvalid = !!errors.password;
    const isConfirmPasswordInvalid = !!errors.confirmPassword;
    const isEmailInvalid = !!errors.email;

    const printData = (data) => {
        console.log(data);
    };
    return (
        <RegisterForm onSubmit={handleSubmit(printData)}>
            <Form.Group style={{ width: "32%" }} controlId="registerForm.email">
                <Form.Label>Email</Form.Label>
                <Form.Input
                    type="text"
                    isInvalid={isEmailInvalid}
                    {...register("email")}
                ></Form.Input>
                <Form.Feedback type="invalid">{errors?.email?.message}</Form.Feedback>
            </Form.Group>
            <Form.Group style={{ width: "32%" }} controlId="registerForm.userName">
                <Form.Label>User name</Form.Label>
                <Form.Input
                    type="text"
                    isInvalid={isUserNameInvalid}
                    {...register("userName")}
                ></Form.Input>
                <Form.Feedback type="invalid">{errors?.userName?.message}</Form.Feedback>
            </Form.Group>
            <Form.Group style={{ width: "32%" }} controlId="registerForm.password">
                <Form.Label>Password</Form.Label>
                <Form.Input
                    type="password"
                    isInvalid={isPasswordInvalid}
                    {...register("password")}
                ></Form.Input>
                <Form.Feedback type="invalid">{errors?.password?.message}</Form.Feedback>
            </Form.Group>
            <Form.Group style={{ width: "32%" }} controlId="registerForm.confirmPassword">
                <Form.Label>Confirm password</Form.Label>
                <Form.Input
                    type="password"
                    isInvalid={isConfirmPasswordInvalid}
                    {...register("confirmPassword")}
                ></Form.Input>
                <Form.Feedback type="invalid">{errors?.confirmPassword?.message}</Form.Feedback>
            </Form.Group>
            <Button size={"small"} variant="primary" style={{ width: "10%" }}>
                <Button.Label style={{ fontWeight: "500" }}>
                    {isLoading ? <Loader aria-label="Loading" size="small" /> : "Login"}
                </Button.Label>
            </Button>
        </RegisterForm>
    );
};

const RegisterForm = styled.form`
    min-height: 100%;
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid;
    margin: 40px auto;
    padding: 60px;
`;

export default Register;