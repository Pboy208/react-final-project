import Layout from "./components/common/Layout";
import GlobalStyle from "./components/common/GlobalStyle";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ProductForm from "./components/common/ProductForm";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProduct";
const App = () => {
    return (
        <>
            <GlobalStyle theme="light" />
            <Layout>
                <Routes>
                    <Route path="/" exact element={<Navigate to="/home" />} />
                    <Route path="/login" exact element={<Login />} />
                    <Route path="/register" exact element={<Register />} />
                    <Route path="/home" exact element={<Home />} />
                    <Route path="/product/create" exact element={<AddProduct />} />
                    <Route path="/product/:productId" exact element={<UpdateProduct />} />
                    <Route path="/*" element={<div>not found</div>} />
                </Routes>
            </Layout>
        </>
    );
};

export default App;
