import * as React from "react";
import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";

const Layout = ({ children }) => {
    return (
        <Wrapper>
            <Header />
            <Body>{children}</Body>
            <Footer />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

const Body = styled.div`
    flex: 1 999999;
    width: 90%;
    margin: 0 auto;
`;

export default Layout;
