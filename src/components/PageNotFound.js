import * as React from "react";
import styled from "styled-components";

const PageNotFound = () => {
    return <Notification>Page not found ...</Notification>;
};

const Notification = styled.div`
    width: 100%;
    min-height: 60vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default PageNotFound;
