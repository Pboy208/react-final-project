import * as React from "react";
import Layout from "./components/common/Layout";
import GlobalStyle from "./components/common/GlobalStyle";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import PageNotFound from "./components/PageNotFound";
import { useTheme } from "./context/ThemeContext";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { ToastContainer } from "@ahaui/react";
const Home = React.lazy(() => import("./components/Home"));
const Register = React.lazy(() => import("./components/Register"));
const AddProduct = React.lazy(() => import("./components/AddProduct"));
const UpdateProduct = React.lazy(() => import("./components/UpdateProduct"));

const App = () => {
    const { theme } = useTheme();
    console.log("render App");
    return (
        <>
            <GlobalStyle theme={theme} />
            <ToastContainer />
            <Layout>
                <Routes>
                    <Route path="/" exact element={<Navigate to="/home" />} />
                    <Route path="/login" exact element={<Login />} />
                    <Route path="/register" exact element={<Register />} />
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
            </Layout>
        </>
    );
};

export default App;
