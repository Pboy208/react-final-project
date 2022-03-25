import * as React from "react";
import Layout from "./components/common/Layout";
import GlobalStyle from "./components/common/GlobalStyle";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import PageNotFound from "./components/PageNotFound";
import { useTheme } from "./context/ThemeContext";
import ProtectedRoute from "./components/common/ProtectedRoute";
import UnprotectedRoute from "./components/common/UnprotectedRoute";
import { ToastContainer } from "@ahaui/react";
import LoadingSpinner from "./components/common/LoadingSpinner";

const Home = React.lazy(() => import("./components/Home"));
const Register = React.lazy(() => import("./components/Register"));
const AddProduct = React.lazy(() => import("./components/AddProduct"));
const UpdateProduct = React.lazy(() => import("./components/UpdateProduct"));

const App = () => {
    const { theme } = useTheme();
    return (
        <>
            <GlobalStyle theme={theme} />
            <ToastContainer />
            <Layout>
                <React.Suspense fallback={<LoadingSpinner isLoading={true} />}>
                    <Routes>
                        <Route path="/" exact element={<Navigate to="/home" />} />
                        <Route
                            path="/login"
                            exact
                            element={<UnprotectedRoute component={Login} />}
                        />
                        <Route
                            path="/register"
                            exact
                            element={<UnprotectedRoute component={Register} />}
                        />

                        <Route path="/home" exact element={<ProtectedRoute component={Home} />} />
                        <Route
                            path="/product/create"
                            exact
                            element={<ProtectedRoute component={AddProduct} />}
                        />
                        <Route
                            path="/product/:productId"
                            exact
                            element={<ProtectedRoute component={UpdateProduct} />}
                        />
                        <Route path="/*" element={<PageNotFound />} />
                    </Routes>
                </React.Suspense>
            </Layout>
        </>
    );
};

export default App;
