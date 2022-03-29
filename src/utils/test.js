import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from '@ahaui/react';
import { ThemeProvider } from 'context/ThemeContext';
import { store } from 'store';
import App from 'App';

const render = (ui, { ...options } = {}) => {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <ThemeProvider>
          <ToastContainer />
          <Router>{children}</Router>
        </ThemeProvider>
      </Provider>
    );
  }

  return rtlRender(ui, { wrapper: Wrapper, ...options });
};

const renderApp = ({ ...options } = {}) => {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <ThemeProvider>
          <ToastContainer />
          <Router>{children}</Router>
        </ThemeProvider>
      </Provider>
    );
  }

  return rtlRender(<App />, { wrapper: Wrapper, ...options });
};

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e-[p=gfyJ1c2VybmFtZSI6IkxlbyBOZ3V5ZW4iLCJpYXQiOjE2NDc2MTUzOTksImV4cCI6NzM2NDc2MTUzOTl9.mVRG2x_W8U8fBUjwb1nO7GErmuneTdPv4JSGyUfcaLk';

export * from '@testing-library/react';
export { render, renderApp, token };
