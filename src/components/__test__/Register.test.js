/* eslint-disable no-undef */
import userEvent from '@testing-library/user-event';
import { waitForElementToBeRemoved } from '@testing-library/react';
import Register from 'components/Register';
import { render, act, screen } from 'utils/test';

test('Should show error when fields are invalid', async () => {
  // make invalid data
  const registerInfo = {
    email: 'invalidEmail',
    userName: 'none',
    password: 'none',
    confirmPassword: 'none',
  };

  // render component
  render(<Register />);

  // type register info
  await act(async () =>
    userEvent.type(screen.getByLabelText(/email/i), registerInfo.email),
  );
  await act(async () =>
    userEvent.type(screen.getByLabelText(/user name/i), registerInfo.userName),
  );
  await act(async () =>
    userEvent.type(
      screen.getAllByLabelText(/password/i)[0],
      registerInfo.password,
    ),
  );
  await act(async () =>
    userEvent.type(
      screen.getAllByLabelText(/password/i)[1],
      registerInfo.confirmPassword,
    ),
  );

  // check error message
  expect(screen.getAllByRole('alert')[0].textContent).toMatchInlineSnapshot(
    `"Email is invalid"`,
  );
  expect(screen.getAllByRole('alert')[1].textContent).toMatchInlineSnapshot(
    `"User's name must be at least 5 characters"`,
  );
  expect(screen.getAllByRole('alert')[2].textContent).toMatchInlineSnapshot(
    `"Password must be at least 5 characters"`,
  );
  expect(screen.getAllByRole('alert')[3].textContent).toMatchInlineSnapshot(
    `"Password must be at least 5 characters"`,
  );
});

test('Should show error when fields are null', async () => {
  // render component
  render(<Register />);

  // press register button
  await act(async () =>
    userEvent.click(screen.getByRole('button', { name: /register/i })),
  );

  // check error message
  expect(screen.getAllByRole('alert')[0].textContent).toMatchInlineSnapshot(
    `"Email is required"`,
  );
  expect(screen.getAllByRole('alert')[1].textContent).toMatchInlineSnapshot(
    `"User's name is required"`,
  );
  expect(screen.getAllByRole('alert')[2].textContent).toMatchInlineSnapshot(
    `"Password is required"`,
  );
  expect(screen.getAllByRole('alert')[3].textContent).toMatchInlineSnapshot(
    `"Confirm password is required"`,
  );
});

test('Should redirect and show toast when register with valid information', async () => {
  // make valid data
  const registerInfo = {
    email: 'testingAccount@gmail.com',
    userName: 'testing user',
    password: 'phuong123',
    confirmPassword: 'phuong123',
  };

  // render component
  render(<Register />);

  // type register info
  await act(async () =>
    userEvent.type(screen.getByLabelText(/email/i), registerInfo.email),
  );
  await act(async () =>
    userEvent.type(screen.getByLabelText(/user name/i), registerInfo.userName),
  );
  await act(async () =>
    userEvent.type(
      screen.getAllByLabelText(/password/i)[0],
      registerInfo.password,
    ),
  );
  await act(async () =>
    userEvent.type(
      screen.getAllByLabelText(/password/i)[1],
      registerInfo.confirmPassword,
    ),
  );

  // press register button
  await act(async () =>
    userEvent.click(screen.getByRole('button', { name: /register/i })),
  );

  // wait for response
  await waitForElementToBeRemoved(() => screen.queryByLabelText(/loading/i));

  // expect success toast and redirect to home page
  expect(global.window.location.pathname).toEqual('/home');
  expect(screen.getByText('Register success')).toBeInTheDocument();
});

test('Should show error toast when register with invalid information', async () => {
  // make valid data
  const registerInfo = {
    email: 'phuong@gmail.com',
    userName: 'testing user',
    password: 'phuong123',
    confirmPassword: 'phuong123',
  };

  // render component
  render(<Register />);

  // type register info
  await act(async () =>
    userEvent.type(screen.getByLabelText(/email/i), registerInfo.email),
  );
  await act(async () =>
    userEvent.type(screen.getByLabelText(/user name/i), registerInfo.userName),
  );
  await act(async () =>
    userEvent.type(
      screen.getAllByLabelText(/password/i)[0],
      registerInfo.password,
    ),
  );
  await act(async () =>
    userEvent.type(
      screen.getAllByLabelText(/password/i)[1],
      registerInfo.confirmPassword,
    ),
  );

  // press register button
  await act(async () =>
    userEvent.click(screen.getByRole('button', { name: /register/i })),
  );

  // wait for response
  await waitForElementToBeRemoved(() => screen.queryByLabelText(/loading/i));

  // expect success toast and redirect to home page
  expect(
    screen.getByText('Register failed, email has already been used'),
  ).toBeInTheDocument();
});
