import * as React from "react";
import styled from "styled-components";
import { SearchBox, Dropdown, Icon, Button } from "@ahaui/react";
import ProductList from "../components/ProductList";
import useSortedAndSearchedProducts from "../hooks/useSortedAndSearchedProducts";
import LoadingSpinner from "./common/LoadingSpinner";
const Home = () => {
    const { status, productList, setSortBy, setSearch, sortBy, search } =
        useSortedAndSearchedProducts();
    const handleClick = () => console.log("clicked");

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearch(value);
    };

    const handleSortByChange = (e) => {
        const value = e.target.id;
        setSortBy(value);
    };

    if (!productList || status === "pending")
        return <LoadingSpinner isLoading={status === "pending"} />;
    return (
        <Wrapper>
            <SearchBar
                placeholder="Search..."
                onClickButton={handleClick}
                value={search}
                onChange={handleSearchChange}
                buttonIcon={null}
                buttonText="Sort by"
            />
            <TitlesAndSortByWrapper>
                <ColumnTitles>
                    <Title flex={3}>Name</Title>
                    <Title flex={1}>Price</Title>
                    <Title flex={1}>Image</Title>
                </ColumnTitles>
                <Dropdown
                    alignRight
                    style={{ marginTop: "20px", width: "16%" }}
                    className="u-flex u-justifyContentEnd"
                >
                    <Dropdown.Button
                        variant="secondary"
                        style={{
                            fontSize: "14px",
                            width: "80%",
                            paddingTop: "0px",
                            paddingBottom: "0px",
                        }}
                    >
                        <Button.Label>Sort by:</Button.Label>
                        <Button.Label>
                            {sortBy === "CREATED_TIME"
                                ? "Currently added"
                                : sortBy === "PRICE_INCREASE"
                                ? "Price increase"
                                : "Price decrease"}
                        </Button.Label>
                    </Dropdown.Button>
                    <Dropdown.Container
                        style={{
                            backgroundColor: "#DEE2EA",
                            top: "100%",
                            left: "20%",
                            width: "80%",
                        }}
                        className="u-paddingVerticalExtraSmall"
                    >
                        <Dropdown.Item styled={{ cursor: "pointer" }}>
                            <div id="CREATED_TIME" onClick={handleSortByChange}>
                                Currently added
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <div id="PRICE_INCREASE" onClick={handleSortByChange}>
                                Price increase
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <div id="PRICE_DECREASE" onClick={handleSortByChange}>
                                Price decrease
                            </div>
                        </Dropdown.Item>
                    </Dropdown.Container>
                </Dropdown>
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

const SearchBar = styled(SearchBox)`
    width: 60%;
    margin: 12px 0;
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
