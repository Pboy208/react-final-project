/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-nested-ternary */
import * as React from 'react';
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'context/ThemeContext';
import { logout } from 'store/authSlice';
import { Device } from 'constants/mediaQuery';

function Header() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

  const renderNavigationBar = () =>
    isLoggedIn ? (
      <Button onClick={logoutHandler}>
        <i className="fa-solid fa-arrow-right-from-bracket" />
        <ToolTip>Logout</ToolTip>
      </Button>
    ) : pathname === '/login' ? (
      <NavigateButton to="/register">
        Haven't got any account? <i className="fa-solid fa-user-plus" />
      </NavigateButton>
    ) : (
      <NavigateButton to="/login">
        Already have an account?{' '}
        <i className="fa-solid fa-arrow-right-to-bracket" />
      </NavigateButton>
    );

  return (
    <Wrapper>
      <Side />
      <Logo to="/home">Leo's</Logo>
      <Side>
        <Actions>
          {renderNavigationBar()}
          <Button onClick={toggleTheme} data-testid="toggle-theme-button">
            <i
              className={`fa-solid ${theme === 'light' ? 'fa-sun' : 'fa-moon'}`}
              data-testid={
                theme === 'light' ? 'light-theme-icon' : 'dark-theme-icon'
              }
            />
            <ToolTip>Change theme</ToolTip>
          </Button>
        </Actions>
      </Side>
    </Wrapper>
  );
}

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

  @media ${Device.MOBILE} {
    gap: 10px;
  }
`;

const Side = styled.div`
  width: 24%;
`;

const Logo = styled(Link)`
  font-family: 'Rouge Script';
  font-size: var(--logo-font-size);
  margin: 0;
  text-align: 'center';
`;

const Button = styled.div`
  position: relative;
  cursor: pointer;

  & i {
    font-size: var(--button-size);
  }

  &:hover span {
    display: unset;
  }

  @media ${Device.MOBILE} {
    & i {
      font-size: 16px;
    }
  }
`;

const ToolTip = styled.span`
  position: absolute;
  top: 110%;
  right: -20%;
  display: none;
  font-size: 16px;
  border: 1px solid;
  border-radius: 6px;
  padding: 4px 8px;
  background-color: white;
  color: black;
  width: max-content;

  &::after {
    content: '';
    position: absolute;
    bottom: 100%;
    right: 12px;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    /* border-color: transparent transparent #555 transparent; */
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

  @media ${Device.MOBILE} {
    font-size: 10px;

    & i {
      font-size: 16px;
    }
  }
`;

export default Header;
