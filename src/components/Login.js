/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { Form, Button, Loader } from '@ahaui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import validationSchema from 'utils/schemas/loginSchema';
import { login } from 'store/authSlice';
import * as Toast from 'components/common/Toast';

function Login() {
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
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
      .then(() => {
        Toast.success('Login success');
        navigate('/home');
      })
      .catch(console.error);
  };

  return (
    <LoginForm onSubmit={handleSubmit(handleLogin)} data-testid="login-page">
      <FormGroup controlId="loginForm.email">
        <Form.Label>Email</Form.Label>
        <Form.Input
          type="text"
          isInvalid={isEmailInvalid}
          {...register('email')}
          onBlur={(e) => setValue('email', e.target.value.trim())}
        />
        <FormFeedback type="invalid" role="alert">
          {errors?.email?.message}
        </FormFeedback>
      </FormGroup>
      <FormGroup controlId="loginForm.password">
        <Form.Label>Password</Form.Label>
        <Form.Input
          type="password"
          isInvalid={isPasswordInvalid}
          {...register('password')}
          onBlur={(e) => setValue('password', e.target.value.trim())}
        />
        <FormFeedback type="invalid" role="alert">
          {errors?.password?.message}
        </FormFeedback>
      </FormGroup>
      <LoginButton size="small" variant="primary">
        <Button.Label>
          {isLoading ? <Loader aria-label="Loading" size="small" /> : 'Login'}
        </Button.Label>
      </LoginButton>
    </LoginForm>
  );
}

const LoginForm = styled.form`
  min-height: 100%;
  width: var(--card-width);
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid;
  margin: 40px auto;
  padding: 60px;
  border-radius: 12px;
`;

const FormGroup = styled(Form.Group)`
  width: var(--field-responsive-width);
`;

const FormFeedback = styled(Form.Feedback)`
  font-size: var(--font-size);
`;

const LoginButton = styled(Button)`
  width: max(10%, 70px);
`;

export default Login;
