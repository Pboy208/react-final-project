import * as React from "react";
import styled from "styled-components";

const Header = () => {
    const isLoggedIn = false;
    const pathname = "/login";
    const theme = "light";

    const logoutHandler = () => {
        console.log("logout");
    };

    const toggleTheme = () => {
        console.log("theme toggled");
    };

    const renderNavigationBar = () => {
        return isLoggedIn ? (
            <Button onClick={logoutHandler}>
                <i className="fa-solid fa-arrow-right-from-bracket" />
            </Button>
        ) : pathname === "/login" ? (
            <NavigateButton href="/register">
                Haven't got any account? <i className="fa-solid fa-user-plus"></i>
            </NavigateButton>
        ) : (
            <NavigateButton href="/login">
                Already have an account? <i className="fa-solid fa-arrow-right-to-bracket"></i>
            </NavigateButton>
        );
    };

    return (
        <Wrapper>
            <Side />
            <Logo>Logo</Logo>
            <Side>
                <Actions>
                    {renderNavigationBar()}
                    <Button onClick={toggleTheme}>
                        <i className={`fa-solid ${theme === "light" ? "fa-sun" : "fa-moon"}`}></i>
                    </Button>
                </Actions>
            </Side>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    min-height: min(8vh, 150px);
    margin: 0 auto;
    width: 90%;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid;
`;

const Actions = styled.div`
    display: flex;
    justify-content: baseline;
    align-items: center;
    height: 100%;
    gap: 20px;
`;

const Side = styled.div`
    width: 24%;
`;

const Logo = styled.p`
    font-family: "Rouge Script";
    font-size: 100px;
    margin: 0;
    text-align: "center";
`;

const Button = styled.button``;

const NavigateButton = styled.a`
    height: 30px;
    padding: 1px 6px;
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    gap: 4px;

    &:hover {
        text-decoration: none;
        color: black;
    }
`;

export default Header;
