/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import userEvent from '@testing-library/user-event';
import { waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import AddProduct from 'components/AddProduct';
import { render, act, screen } from 'utils/test';
import server from 'mocks/server';
import { rest } from 'msw';
import * as mock from 'mocks/mockForTesting';

test('Should see null fields at first', async () => {
  // render component
  render(<AddProduct />);

  // expect null fields
  expect(screen.getByLabelText(/title/i).value).toEqual('');
  expect(screen.getByLabelText(/image url/i).value).toEqual('');
  expect(screen.getByLabelText(/price/i).value).toEqual('0');
});

test('Should redirect to home and show add success toast', async () => {
  // render component
  render(<AddProduct />);

  // type product info
  userEvent.type(screen.getByLabelText(/title/i), mock.product.title);
  userEvent.type(screen.getByLabelText(/image url/i), mock.product.imageUrl);
  userEvent.type(screen.getByLabelText(/price/i), mock.product.price);

  // press save button
  await act(async () =>
    userEvent.click(screen.getByRole('button', { name: /save/i })),
  );

  // wait for response
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  // expect success toast and redirect to home page
  expect(
    screen.getByText(`${mock.product.title} is added`),
  ).toBeInTheDocument();
  expect(global.window.location.pathname).toEqual('/home');
});
