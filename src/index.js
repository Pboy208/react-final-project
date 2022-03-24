import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import FallbackComponent from "./components/common/FallbackComponent";
import "@ahaui/css/dist/index.min.css";
import { ThemeProvider } from "./context/ThemeContext";
import initiateDB from "./mocks/database/indexedDB";
import { worker as server } from "./mocks/browser";
import { Provider } from "react-redux";
import { store } from "./store/index";
import { BASE_URL } from "./constants";

initiateDB();
const fullUrl = new URL(BASE_URL);
server.start({
    quiet: true,
    serviceWorker: {
        url: fullUrl.pathname + "mockServiceWorker.js",
    },
});

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider>
                <Router>
                    <ErrorBoundary FallbackComponent={FallbackComponent}>
                        <App />
                    </ErrorBoundary>
                </Router>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
