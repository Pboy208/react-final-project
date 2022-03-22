import Layout from "./components/common/Layout";
import GlobalStyle from "./components/common/GlobalStyle";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProduct";
import PageNotFound from "./components/PageNotFound";
import { useTheme } from "./context/ThemeContext";

const App = () => {
    const { theme } = useTheme();

    return (
        <>
            <GlobalStyle theme={theme} />
            <Layout>
                <Routes>
                    <Route path="/" exact element={<Navigate to="/home" />} />
                    <Route path="/login" exact element={<Login />} />
                    <Route path="/register" exact element={<Register />} />
                    <Route path="/home" exact element={<Home />} />
                    <Route path="/product/create" exact element={<AddProduct />} />
                    <Route path="/product/:productId" exact element={<UpdateProduct />} />
                    <Route path="/*" element={<PageNotFound />} />
                </Routes>
            </Layout>
        </>
    );
};

export default App;
