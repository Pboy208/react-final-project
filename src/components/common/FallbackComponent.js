import { EmptyState, Button } from '@ahaui/react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function FallbackComponent({ error, resetErrorBoundary }) {
  const navigate = useNavigate();

  const handleResetErrorBoundary = () => {
    navigate('/home');
    resetErrorBoundary();
  };

  return (
    <Wrapper>
      <EmptyState src="https://raw.githubusercontent.com/gotitinc/aha-assets/master/gotit/emptyState/general.svg">
        <EmptyState.Heading>There was an error:</EmptyState.Heading>
        <EmptyState.Description>{error.message}</EmptyState.Description>
        <Button variant="secondary" onClick={handleResetErrorBoundary}>
          Try again
        </Button>
      </EmptyState>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  top: 20vh;
  text-align: center;
`;

export default FallbackComponent;
