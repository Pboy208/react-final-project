import * as React from 'react';
import styled from 'styled-components';
import Product from './Product';

const ProductList = React.memo(({ productList = [] }) => (
  <List>
    {productList.map((product) => (
      <Product key={product.id} product={product} />
    ))}
  </List>
));

const List = styled.ul`
  width: 100%;
  min-height: 60vh;
  height: 80vh;
  overflow: auto;
  border: 1px solid;
  margin-bottom: 20px;
  padding: 0;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 0;
`;

export default ProductList;
