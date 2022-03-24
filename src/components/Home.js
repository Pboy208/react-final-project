import * as React from "react";
import styled from "styled-components";
import ProductList from "../components/ProductList";
import useSortedAndSearchedProducts from "../hooks/useSortedAndSearchedProducts";
import LoadingSpinner from "./common/LoadingSpinner";
import { Link } from "react-router-dom";
const Home = () => {
    const { isLoading, productList, setSortBy, setSearch, sortBy, search } =
        useSortedAndSearchedProducts();

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearch(value);
    };

    const handleSortByChange = (e) => {
        const value = e.target.value;
        setSortBy(value);
    };

    if (!productList || isLoading) return <LoadingSpinner isLoading={isLoading} />;
    return (
        <Wrapper>
            <SearchAndSortBy>
                <SearchBox value={search} onChange={handleSearchChange} placeholder="Search..." />
                <SortBy value={sortBy} onChange={handleSortByChange}>
                    <option value="CREATED_TIME">Recently added</option>
                    <option value="PRICE_INCREASE">Price increasing</option>
                    <option value="PRICE_DECREASE">Price decreasing</option>
                </SortBy>
            </SearchAndSortBy>
            <TitlesAndAddBtn>
                <ColumnTitles>
                    <Title flex={5}>Name</Title>
                    <Title flex={2}>Price</Title>
                    <Title flex={1}>Image</Title>
                </ColumnTitles>
                <AddBtn to="/product/create">Add item</AddBtn>
            </TitlesAndAddBtn>
            <ProductList productList={productList} />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    min-height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SearchAndSortBy = styled.div`
    width: 60%;
    margin: 12px 0;
    display: flex;
`;
const SearchBox = styled.input`
    flex: 4;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    border: 1px solid;
    border-right: none;
    font-size: 14px;
    padding: 10px 20px;
`;
const SortBy = styled.select`
    flex: 1;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    text-align: center;
`;

const TitlesAndAddBtn = styled.div`
    width: 100%;
    display: flex;
    gap: 20px;
    justify-content: space-between;
    align-items: flex-end;
`;

const ColumnTitles = styled.div`
    margin-top: 20px;
    display: flex;
    width: 80%;
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

const AddBtn = styled(Link)`
    width: 10%;
    border: 1px solid;
    border-radius: 16px 16px 0 0;
    border-bottom: none;
    text-align: center;
    height: 30px;
    margin-right: 4.5%;
    cursor: pointer;
`;

export default Home;
