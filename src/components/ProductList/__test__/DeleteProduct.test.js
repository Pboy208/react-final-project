/* eslint-disable no-undef */
import userEvent from '@testing-library/user-event';
import ProductList from 'components/ProductList';
import { render, screen, act, waitForElementToBeRemoved } from 'utils/test';
import * as mock from 'mocks/mockForTesting';

beforeEach(() => {
  const div = document.createElement('div');
  div.setAttribute('id', 'portal');
  document.body.appendChild(div);
});

afterEach(() => {
  document.body.innerHTML = '';
});

test('Should show confirm modal ', async () => {
  // render component
  render(<ProductList productList={mock.productList} />);

  // press delete button
  userEvent.click(screen.getByTestId('delete-button'));

  // expect confirm message
  expect(
    screen.getByText('Do you really want to delete this item'),
  ).toBeInTheDocument();

  // press confirm button
  await act(async () => userEvent.click(screen.getByText(/yes/i)));

  // wait for response
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  // screen.debug();
  // expect success toast
  expect(screen.getByText('Delete success')).toBeInTheDocument();
});
