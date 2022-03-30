/* eslint-disable no-undef */
import ProductList from 'components/ProductList';
import { render, screen } from 'utils/test';

const mockProductList = [
  {
    id: '4aff282b-46b0-469b-b91a-52f0b2fccabb',
    price: 5200000,
    title: 'GIÀY ULTRABOOST 22',
    imageUrl:
      'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fbaf991a78bc4896a3e9ad7800abcec6_9366/ULTRABOOST_22_DJen_GZ0127_01_standard.jpg',
    createdTimestamp: 1647869066420,
  },
  {
    id: '52f0b2fccabb-4aff282b-46b0-469b-b91a',
    price: 999999,
    title: 'GIÀY Stan smith 22',
    imageUrl:
      'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fbaf991a78bc4896a3e9ad7800abcec6_9366/ULTRABOOST_22_DJen_GZ0127_01_standard.jpg',
    createdTimestamp: 1647869066420,
  },
];

test('Should show product information ', async () => {
  // render component
  render(<ProductList productList={mockProductList} />);

  // expect first product information to be shown
  expect(screen.getByText(/GIÀY ULTRABOOST 22/i)).toBeInTheDocument();
  expect(screen.getByText(/5.200.000/i)).toBeInTheDocument();

  // expect second product information to be shown
  expect(screen.getByText(/GIÀY Stan smith 22/i)).toBeInTheDocument();
  expect(screen.getByText(/999.999/i)).toBeInTheDocument();
});
