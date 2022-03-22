import * as React from "react";
import styled from "styled-components";

const Footer = () => {
    return <Wrapper>This is Footer</Wrapper>;
};

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: min(10vh, 100px);
    border-top: 1px solid;
`;

export default Footer;
