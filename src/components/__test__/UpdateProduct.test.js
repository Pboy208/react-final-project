/* eslint-disable no-undef */
import userEvent from '@testing-library/user-event';
import { waitForElementToBeRemoved } from '@testing-library/react';
import UpdateProduct from 'components/UpdateProduct';
import { render, act, screen, resetReduxProductState } from 'utils/test';
import * as mock from 'mocks/mockForTesting';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    productId: mock.product.id,
  }),
}));

afterEach(() => {
  resetReduxProductState();
});

test('Should loading at first', async () => {
  // render component
  render(<UpdateProduct />);

  // expect loading spinner
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
});

test('Should auto fetch if redux state is null at first', async () => {
  // render component
  render(<UpdateProduct />);

  // wait for response for first fetch
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  // expect product information
  expect(screen.getByLabelText(/title/i).value).toEqual(mock.product.title);
});

test('Should redirect to home and show update success toast', async () => {
  // render component
  render(<UpdateProduct />);

  // wait for response for first fetch as redux state is null at first
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  // press save button
  await act(async () =>
    userEvent.click(screen.getByRole('button', { name: /save/i })),
  );

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  // expect success toast and redirect to home page
  expect(screen.getByText('Update success')).toBeInTheDocument();
  expect(global.window.location.pathname).toEqual('/home');
});
