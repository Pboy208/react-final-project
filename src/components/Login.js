import * as React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Form, Button, Loader } from "@ahaui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema from "../utils/schemas/loginSchema";
import useAsync from "../hooks/useAsync";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import * as Toast from "./common/Toast";
const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(validationSchema),
    });
    const { isLoading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isEmailInvalid = !!errors.email;
    const isPasswordInvalid = !!errors.password;

    const handleLogin = (loginInfo) => {
        dispatch(login(loginInfo))
            .unwrap()
            .then(() => Toast.success(`Login success`))
            .then(() => navigate("/home"));
    };
    return (
        <LoginForm onSubmit={handleSubmit(handleLogin)}>
            <Form.Group controlId="loginForm.email">
                <Form.Label>Email</Form.Label>
                <Form.Input
                    type="text"
                    isInvalid={isEmailInvalid}
                    {...register("email")}
                ></Form.Input>
                <Form.Feedback type="invalid">{errors?.email?.message}</Form.Feedback>
            </Form.Group>
            <Form.Group controlId="loginForm.password">
                <Form.Label>Password</Form.Label>
                <Form.Input
                    type="password"
                    isInvalid={isPasswordInvalid}
                    {...register("password")}
                ></Form.Input>
                <Form.Feedback type="invalid">{errors?.password?.message}</Form.Feedback>
            </Form.Group>
            <Button size={"small"} variant="primary" style={{ width: "10%" }}>
                <Button.Label style={{ fontWeight: "500" }}>
                    {isLoading ? <Loader aria-label="Loading" size="small" /> : "Login"}
                </Button.Label>
            </Button>
        </LoginForm>
    );
};

const LoginForm = styled.form`
    min-height: 100%;
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid;
    margin: 40px auto;
    padding: 60px;
`;

export default Login;
