import styled from 'styled-components';
import { Loader } from '@ahaui/react';
import * as React from 'react';

const LoadingSpinner = React.memo(
  ({ isLoading }) =>
    isLoading && <StyledLoader aria-label="Loading" size="large" />,
);

const StyledLoader = styled(Loader)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`;

export default LoadingSpinner;
