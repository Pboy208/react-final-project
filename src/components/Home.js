import * as React from "react";
import styled from "styled-components";
import { SearchBox } from "@ahaui/react";
import ProductList from "../components/ProductList";
const Home = () => {
    const handleClick = () => console.log("clicked");

    const handleSearchChange = (e) => {
        const value = e.target.value;
        console.log(value);
    };

    return (
        <Wrapper>
            <SearchBar
                placeholder="Search..."
                onClickButton={handleClick}
                value={""}
                onChange={handleSearchChange}
            />
            <ProductList />
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

export default Home;
