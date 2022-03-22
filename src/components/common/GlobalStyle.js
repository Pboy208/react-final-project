import { createGlobalStyle } from "styled-components";

const themes = {
    light: {
        body: "#FFF",
        background: "white",
        text: "#363537",
        borderColor: "#363537",
    },
    dark: {
        body: "#5C3D2E",
        background: "rgb(0, 30, 60)",
        text: "#FAFAFA",
        borderColor: "#FAFAFA",
    },
};

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
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
