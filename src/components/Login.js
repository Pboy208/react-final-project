import * as React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Form, Button, Loader } from "@ahaui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema from "../utils/schemas/loginSchema";
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
            <FormGroup controlId="loginForm.email">
                <Form.Label>Email</Form.Label>
                <Form.Input
                    type="text"
                    isInvalid={isEmailInvalid}
                    {...register("email")}
                ></Form.Input>
                <FormFeedback type="invalid">{errors?.email?.message}</FormFeedback>
            </FormGroup>
            <FormGroup controlId="loginForm.password">
                <Form.Label>Password</Form.Label>
                <Form.Input
                    type="password"
                    isInvalid={isPasswordInvalid}
                    {...register("password")}
                ></Form.Input>
                <FormFeedback type="invalid">{errors?.password?.message}</FormFeedback>
            </FormGroup>
            <Button size={"small"} variant="primary" style={{ width: "max(10%,60px)" }}>
                <Button.Label style={{ fontWeight: "500" }}>
                    {isLoading ? <Loader aria-label="Loading" size="small" /> : "Login"}
                </Button.Label>
            </Button>
        </LoginForm>
    );
};

const LoginForm = styled.form`
    min-height: 100%;
    width: var(--card-width);
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid;
    margin: 40px auto;
    padding: 60px;
`;

const FormGroup = styled(Form.Group)`
    width: var(--field-responsive-width);
`;
const FormFeedback = styled(Form.Feedback)`
    font-size: var(--font-size);
`;

export default Login;
