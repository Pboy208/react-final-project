/* eslint-disable no-undef */
import { waitForElementToBeRemoved } from '@testing-library/react';
import {
  renderAppWithRoute,
  screen,
  resetReduxProductState,
  resetReduxAuthState,
} from 'utils/test';
import * as mock from 'mocks/mockForTesting';

afterEach(() => {
  resetReduxProductState();
});

test('Should show home page', async () => {
  // render component
  renderAppWithRoute('/home');

  // wait for loading spinner to be removed
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  // expect to have right page
  expect(screen.getByTestId('home-page')).toBeInTheDocument();
});

test('Should redirect to home page when get into "/"', async () => {
  // render component
  renderAppWithRoute('/');

  // wait for loading spinner to be removed
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  // expect to have right page
  expect(screen.getByTestId('home-page')).toBeInTheDocument();
});

test('Should show add product page', async () => {
  // render component
  renderAppWithRoute('/product/create');

  // wait for loading spinner to be removed
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  // expect to have right page
  expect(screen.getByTestId('add-product-page')).toBeInTheDocument();
});

test('Should show update product page', async () => {
  // render component
  renderAppWithRoute(`/product/${mock.product.id}`);

  // wait for loading spinner to be removed
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  // expect to have right page
  expect(screen.getByTestId('update-product-page')).toBeInTheDocument();
});

test('Should redirect to "/home" when get to "/login" with valid session', async () => {
  // render component
  renderAppWithRoute(`/login`);

  // wait for loading spinner to be removed
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  // expect to have right page
  expect(screen.getByTestId('home-page')).toBeInTheDocument();
});

test('Should redirect to "/login" when dont have token', async () => {
  // logout
  resetReduxAuthState();

  // render component
  renderAppWithRoute(`/product/${mock.product.id}`);

  // expect to have right page
  expect(screen.getByTestId('login-page')).toBeInTheDocument();
});

test('Should show login page', async () => {
  // logout
  resetReduxAuthState();

  // render component
  renderAppWithRoute(`/login`);

  // expect to have right page
  expect(screen.getByTestId('login-page')).toBeInTheDocument();
});

test('Should show register page', async () => {
  // logout
  resetReduxAuthState();

  // render component
  renderAppWithRoute(`/register`);

  // wait for loading spinner to be removed
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  // expect to have right page
  expect(screen.getByTestId('register-page')).toBeInTheDocument();
});

test('Should show not found page', async () => {
  // logout
  resetReduxAuthState();

  // render component
  renderAppWithRoute(`/notfoundpage`);

  // expect to have right page
  expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
});
