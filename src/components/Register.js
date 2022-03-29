/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { Form, Button, Loader } from '@ahaui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as authAPIs from 'api/authAPIs';
import validationSchema from 'utils/schemas/registerSchema';
import useAsync from 'hooks/useAsync';
import * as Toast from './common/Toast';

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });
  const { status, handleRequest, error } = useAsync();
  const isLoading = status === 'pending';
  const isUserNameInvalid = !!errors.userName;
  const isPasswordInvalid = !!errors.password;
  const isConfirmPasswordInvalid = !!errors.confirmPassword;
  const isEmailInvalid = !!errors.email;

  const handleRegister = (registerInfo) => {
    handleRequest(authAPIs.register(registerInfo));
  };

  React.useEffect(() => {
    if (status === 'resolved') {
      Toast.success('Register success');
      reset();
    } else if (status === 'rejected') {
      Toast.error(error.message);
    }
  }, [reset, status]);

  return (
    <RegisterForm onSubmit={handleSubmit(handleRegister)}>
      <FormGroup controlId="registerForm.email">
        <Form.Label>Email</Form.Label>
        <Form.Input
          type="text"
          isInvalid={isEmailInvalid}
          {...register('email')}
        />
        <FormFeedback type="invalid" role="alert">
          {errors?.email?.message}
        </FormFeedback>
      </FormGroup>
      <FormGroup controlId="registerForm.userName">
        <Form.Label>User name</Form.Label>
        <Form.Input
          type="text"
          isInvalid={isUserNameInvalid}
          {...register('userName')}
        />
        <FormFeedback type="invalid" role="alert">
          {errors?.userName?.message}
        </FormFeedback>
      </FormGroup>
      <FormGroup controlId="registerForm.password">
        <Form.Label>Password</Form.Label>
        <Form.Input
          type="password"
          isInvalid={isPasswordInvalid}
          {...register('password')}
        />
        <FormFeedback type="invalid" role="alert">
          {errors?.password?.message}
        </FormFeedback>
      </FormGroup>
      <FormGroup controlId="registerForm.confirmPassword">
        <Form.Label>Confirm password</Form.Label>
        <Form.Input
          type="password"
          isInvalid={isConfirmPasswordInvalid}
          {...register('confirmPassword')}
        />
        <FormFeedback type="invalid" role="alert">
          {errors?.confirmPassword?.message}
        </FormFeedback>
      </FormGroup>
      <RegisterButton size="small" variant="primary">
        <Button.Label>
          {isLoading ? (
            <Loader aria-label="Loading" size="small" />
          ) : (
            'Register'
          )}
        </Button.Label>
      </RegisterButton>
    </RegisterForm>
  );
}

const RegisterForm = styled.form`
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
  max-width: var(--field-responsive-width);
  font-size: 14px;
`;

const FormFeedback = styled(Form.Feedback)`
  font-size: var(--font-size);
`;

const RegisterButton = styled(Button)`
  width: max(10%, 70px);
`;

export default Register;
