import * as React from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/authSlice";
import { device } from "../../constants/mediaQuery";
const Header = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const { pathname } = useLocation();
    const { theme, toggleTheme } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = () => {
        dispatch(logOut());
        navigate("/login");
    };

    const renderNavigationBar = () => {
        return isLoggedIn ? (
            <Button onClick={logoutHandler}>
                <i className="fa-solid fa-arrow-right-from-bracket" />
            </Button>
        ) : pathname === "/login" ? (
            <NavigateButton to="/register">
                Haven't got any account? <i className="fa-solid fa-user-plus"></i>
            </NavigateButton>
        ) : (
            <NavigateButton to="/login">
                Already have an account? <i className="fa-solid fa-arrow-right-to-bracket"></i>
            </NavigateButton>
        );
    };

    return (
        <Wrapper>
            <Side />
            <Logo to="/home">Logo</Logo>
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
    width: var(--wrapper-width);
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid;
`;

const Actions = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    gap: 20px;
    @media ${device.mobile} {
        gap: 0px;
    }
`;

const Side = styled.div`
    width: 24%;
`;

const Logo = styled(Link)`
    font-family: "Rouge Script";
    font-size: var(--logo-font-size);
    margin: 0;
    text-align: "center";
`;

const Button = styled.div`
    cursor: pointer;
    & i {
        font-size: var(--button-size);
    }
    @media ${device.mobile} {
        & i {
            font-size: 16px;
        }
    }
`;

const NavigateButton = styled(Link)`
    height: fit-content;
    padding: 1px 6px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 4px;
    font-size: var(--font-size);
    & i {
        font-size: var(--button-size);
    }

    @media ${device.mobile} {
        font-size: 10px;
        & i {
            font-size: 16px;
        }
    }
`;

export default Header;
