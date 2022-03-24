import * as React from "react";
import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";
import { ErrorBoundary } from "react-error-boundary";
import FallbackComponent from "./FallbackComponent";

const Layout = React.memo(({ children }) => {
    return (
        <Wrapper>
            <ErrorBoundary FallbackComponent={FallbackComponent}>
                <Header />
                <Body>{children}</Body>
                <Footer />
            </ErrorBoundary>
        </Wrapper>
    );
});

const Wrapper = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

const Body = styled.div`
    flex: 1 999999;
    width: 90%;
    margin: 0 auto;
    position: relative;
`;

export default Layout;
