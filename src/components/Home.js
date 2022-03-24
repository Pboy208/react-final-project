import * as React from "react";
import styled from "styled-components";
import ProductList from "../components/ProductList";
import useSortedAndSearchedProducts from "../hooks/useSortedAndSearchedProducts";
import LoadingSpinner from "./common/LoadingSpinner";
const Home = () => {
    const { status, productList, setSortBy, setSearch, sortBy, search } =
        useSortedAndSearchedProducts();

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearch(value);
    };

    const handleSortByChange = (e) => {
        const value = e.target.value;
        setSortBy(value);
    };

    if (!productList || status === "pending")
        return <LoadingSpinner isLoading={status === "pending"} />;
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
            <TitlesAndSortByWrapper>
                <ColumnTitles>
                    <Title flex={5}>Name</Title>
                    <Title flex={2}>Price</Title>
                    <Title flex={1}>Image</Title>
                </ColumnTitles>
            </TitlesAndSortByWrapper>
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

const TitlesAndSortByWrapper = styled.div`
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

export default Home;
