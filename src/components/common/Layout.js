import * as React from 'react';
import styled from 'styled-components';
import { ErrorBoundary } from 'react-error-boundary';
import Header from './Header';
import Footer from './Footer';
import FallbackComponent from './FallbackComponent';

const Layout = React.memo(({ children }) => (
  <ErrorBoundary FallbackComponent={FallbackComponent}>
    <Wrapper>
      <Header />
      <Body>{children}</Body>
      <Footer />
    </Wrapper>
  </ErrorBoundary>
));

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Body = styled.div`
  flex: 1 999999;
  width: var(--wrapper-width);
  position: relative;
`;

export default Layout;
