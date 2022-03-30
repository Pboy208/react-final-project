import { createGlobalStyle } from 'styled-components';
import { device } from 'constants/mediaQuery';

const themes = {
  light: {
    body: '#FFF',
    background: 'white',
    text: '#363537',
    borderColor: '#363537',
  },
  dark: {
    body: '#171717',
    background: 'rgb(0, 30, 60)',
    text: '#FAFAFA',
    borderColor: '#FAFAFA',
  },
};

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    --wrapper-width: 90%;
    --logo-font-size: 100px;
    --font-size: 16px;
    --button-size:32px;
    --field-responsive-width: max(32%,220px);
    --card-width: 70%;

    @media ${device.laptop} {
      --wrapper-width: 94%;
      --logo-font-size: 90px;
    }

    @media ${device.tablet} {
      --wrapper-width: 96%;
      --logo-font-size: 85px;
      --button-size:24px;
      --card-width: 85%;

    }

    @media ${device.mobile} {
      --wrapper-width: 98%;
      --logo-font-size: 60px;
      --card-width: 90%;
      --button-size:20px;
    }
  }

  a{
    color: ${({ theme }) => themes[theme].text} ;
    
    &:hover {
        text-decoration: none;
    }
  }

  body {
    background: ${({ theme }) => themes[theme].body};
    color: ${({ theme }) => themes[theme].text};
    border-color: ${({ theme }) => themes[theme].borderColor} !important;
  }
`;

export default GlobalStyle;
