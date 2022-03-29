import * as React from 'react';
import styled from 'styled-components';

function Footer() {
  return <Wrapper>This is Footer</Wrapper>;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: min(10vh, 100px);
  border-top: 1px solid;
  width: 100%;
`;

export default Footer;
