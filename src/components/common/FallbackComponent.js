import { EmptyState, Button } from "@ahaui/react";
import styled from "styled-components";
const FallbackComponent = ({ error, resetErrorBoundary }) => {
    return (
        <Wrapper>
            <EmptyState src="https://raw.githubusercontent.com/gotitinc/aha-assets/master/gotit/emptyState/general.svg">
                <EmptyState.Heading>There was an error:</EmptyState.Heading>
                <EmptyState.Description>{error.message}</EmptyState.Description>
                <Button variant="secondary" onClick={resetErrorBoundary}>
                    Try again
                </Button>
            </EmptyState>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    position: relative;
    top: 20vh;
    left: 0;
    right: 0;
    margin: 0 auto;
`;

export default FallbackComponent;
