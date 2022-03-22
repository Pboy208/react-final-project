import Layout from "./components/common/Layout";
import GlobalStyle from "./components/common/GlobalStyle";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";

const App = () => {
    return (
        <>
            <GlobalStyle theme="light" />
            <Layout>
                <Routes>
                    <Route path="/" exact element={<Navigate to="/home" />} />
                    <Route path="/login" exact element={<div>login</div>} />
                    <Route path="/register" exact element={<div>register</div>} />
                    <Route path="/home" exact element={<Home />} />
                    <Route path="/product/create" exact element={<div>create</div>} />
                    <Route path="/product/:productId" exact element={<div>view</div>} />
                    <Route path="/*" element={<div>not found</div>} />
                </Routes>
            </Layout>
        </>
    );
};

export default App;
