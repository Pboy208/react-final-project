/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import userEvent from '@testing-library/user-event';
import { waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import Home from 'components/Home';
import { render, act, screen, resetReduxState } from 'utils/test';
import server from 'mocks/server';
import { rest } from 'msw';
import * as mock from 'mocks/mockForTesting';

afterEach(() => {
  resetReduxState();
});

test('Should loading at first', async () => {
  // render component
  render(<Home />);

  // expect loading spinner
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
});

test('Should show original product list at first', async () => {
  // render component
  render(<Home />);

  // expect loading spinner
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  // expect to show product list
  expect(screen.getByText(mock.productList[0].title)).toBeInTheDocument();
});

test('Should show sorted product list at first', async () => {
  // render component
  render(<Home />);

  // expect loading spinner
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  // choose sort by price decreasing

  userEvent.selectOptions(screen.getByTestId('sort-by'), ['PRICE_DECREASE']);

  // wait for custom hook to change isLoading state
  await waitForElementToBeRemoved(() =>
    screen.getByText(mock.productList[0].title),
  );

  // expect to show sorted product list
  expect(
    screen.getByText(mock.priceDecreaseProductList[0].title),
  ).toBeInTheDocument();
});

test('Should show searched product list ', async () => {
  // render component
  render(<Home />);

  // expect loading spinner
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  // type search info
  userEvent.type(screen.getByTestId('search-box'), 'search');

  // wait for custom hook to change isLoading state
  await waitForElementToBeRemoved(() =>
    screen.getByText(mock.productList[0].title),
  );

  // expect to show sorted product list
  expect(
    screen.getByText(mock.searchedProductList[0].title),
  ).toBeInTheDocument();
});
