/* eslint-disable no-undef */
import userEvent from '@testing-library/user-event';
import { waitForElementToBeRemoved } from '@testing-library/react';
import Login from 'components/Login';
import { render, act, screen } from 'utils/test';

test('Should show error when fields are invalid', async () => {
  // make invalid data
  const loginInfo = {
    email: '123',
    password: '123',
  };

  // render component
  render(<Login />);

  // type login info
  await act(async () =>
    userEvent.type(screen.getByLabelText(/email/i), loginInfo.email),
  );
  await act(async () =>
    userEvent.type(screen.getByLabelText(/password/i), loginInfo.password),
  );

  // check error message
  expect(screen.getAllByRole('alert')[0].textContent).toBe('Email is invalid');
  expect(screen.getAllByRole('alert')[1].textContent).toBe(
    'Password must be at least 5 characters',
  );
});

test('Should show error when fields are null', async () => {
  // render component
  render(<Login />);

  // press login button
  await act(async () =>
    userEvent.click(screen.getByRole('button', { name: /login/i })),
  );

  // check error message
  expect(screen.getAllByRole('alert')[0].textContent).toBe('Email is required');
  expect(screen.getAllByRole('alert')[1].textContent).toBe(
    'Password is required',
  );
});

test('Should redirect and show toast when login with valid information', async () => {
  // make valid data
  const loginInfo = {
    email: 'phuong@gmail.com',
    password: 'phuong123',
  };

  // render component
  render(<Login />);

  // type login info
  await act(async () =>
    userEvent.type(screen.getByLabelText(/email/i), loginInfo.email),
  );
  await act(async () =>
    userEvent.type(screen.getByLabelText(/password/i), loginInfo.password),
  );

  // press login button
  await act(async () =>
    userEvent.click(screen.getByRole('button', { name: /login/i })),
  );

  // wait for response
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  // expect success toast and redirect to home page
  expect(global.window.location.pathname).toEqual('/home');
  expect(screen.queryByText('Login success')).toBeInTheDocument();
});

test('Should show error toast when login with invalid information', async () => {
  // make invalid data
  const loginInfo = {
    email: 'phuong@gmail.com',
    password: 'wrongpassword',
  };

  // render component
  render(<Login />);

  // type login info
  await act(async () =>
    userEvent.type(screen.getByLabelText(/email/i), loginInfo.email),
  );
  await act(async () =>
    userEvent.type(screen.getByLabelText(/password/i), loginInfo.password),
  );

  // press login button
  await act(async () =>
    userEvent.click(screen.getByRole('button', { name: /login/i })),
  );

  // wait for response
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  // expect error toast
  expect(
    screen.queryByText('Login failed, wrong username or password'),
  ).toBeInTheDocument();
});
