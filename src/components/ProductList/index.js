import * as React from "react";
import styled from "styled-components";
import Product from "./Product";

const ProductList = ({ productList }) => {
    return (
        <>
            <ColumnTitles>
                <Title flex={3}>Name</Title>
                <Title flex={1}>Price</Title>
                <Title flex={1}>Image</Title>
            </ColumnTitles>
            <List>
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
            </List>
        </>
    );
};

const ColumnTitles = styled.div`
    margin-top: 20px;
    display: flex;
    width: 80%;
    align-self: flex-start;
    gap: 10px;
`;

const Title = styled.div`
    flex: ${(prop) => prop.flex};
    height: 30px;
    padding-left: 20px;
    border: 1px solid;
    border-top-right-radius: 16px;
    border-top-left-radius: 4px;
    border-bottom: none;
`;

const List = styled.ul`
    width: 100%;
    min-height: 60vh;
    height: 80vh;
    overflow: auto;
    border: 1px solid;
    margin-bottom: 20px;
    padding: 0;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 0;
`;

export default ProductList;
