/* eslint-disable react/no-unescaped-entities */
import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import sortByConstant from 'constants/sortBy';
import useSortedAndSearchedProducts from 'hooks/useSortedAndSearchedProducts';
import { device } from 'constants/mediaQuery';
import { EmptyState } from '@ahaui/react';
import ProductList from './ProductList';
import LoadingSpinner from './common/LoadingSpinner';

function Home() {
  const { isLoading, productList, setSortBy, setSearch, sortBy, search } =
    useSortedAndSearchedProducts();

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  const handleSortByChange = (e) => {
    const { value } = e.target;
    setSortBy(value);
  };

  if (!productList || isLoading)
    return (
      <Wrapper>
        <SearchAndSortBy>
          <SearchBox placeholder="Search by name..." />
          <SortBy value="Recently added" onChange={handleSortByChange} />
          <LoadingSpinner isLoading={isLoading} />
        </SearchAndSortBy>
      </Wrapper>
    );

  return (
    <Wrapper>
      <SearchAndSortBy>
        <SearchBox
          value={search}
          onChange={handleSearchChange}
          placeholder="Search by name..."
        />
        <SortBy value={sortBy} onChange={handleSortByChange}>
          <SortOption value={sortByConstant.recentlyAdded}>
            Recently added
          </SortOption>
          <SortOption value={sortByConstant.priceIncrease}>
            Price increasing
          </SortOption>
          <SortOption value={sortByConstant.priceDecrease}>
            Price decreasing
          </SortOption>
        </SortBy>
      </SearchAndSortBy>
      {productList.length > 0 ? (
        <>
          <TitlesAndAddBtn>
            <ColumnTitles>
              <Title flex={5}>Name</Title>
              <Title flex={2}>Price</Title>
              <Title flex={1}>Image</Title>
            </ColumnTitles>
            <AddBtn to="/product/create">Add item</AddBtn>
          </TitlesAndAddBtn>
          <ProductList productList={productList} />
        </>
      ) : (
        <NotFoundWrapper>
          <EmptyState src="https://raw.githubusercontent.com/gotitinc/aha-assets/master/gotit/emptyState/general.svg">
            <EmptyState.Heading>
              Can not found any item with name of "{search}""
            </EmptyState.Heading>
          </EmptyState>
        </NotFoundWrapper>
      )}
    </Wrapper>
  );
}

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

  @media ${device.mobile} {
    width: 90%;
  }
`;
const SearchBox = styled.input`
  flex: 4;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  border: 1px solid;
  border-right: none;
  font-size: var(--font-size);
  padding: 10px 20px;

  @media ${device.mobile} {
    flex: 1;
    font-size: 14px;
  }
`;
const SortBy = styled.select`
  flex: 1;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  text-align: center;
  font-size: var(--font-size);

  @media ${device.mobile} {
    font-size: 14px;
  }
`;

const SortOption = styled.option`
  font-size: var(--font-size);
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
  display: flex;
  align-items: center;
  font-size: var(--font-size);

  &:nth-child(2) {
    min-width: 80px;
  }

  &:last-child {
    min-width: 66px;
  }

  @media ${device.tablet} {
    padding-left: 10px;
    height: 40px;
  }

  @media ${device.mobile} {
    padding-left: 4px;
    height: 48px;
  }
`;

const AddBtn = styled(Link)`
  width: 10%;
  border: 1px solid;
  border-radius: 16px 16px 0 0;
  border-bottom: none;
  text-align: center;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 4.5%;
  font-size: var(--font-size);
  cursor: pointer;

  @media ${device.tablet} {
    padding-left: 10px;
    height: 40px;
  }

  @media ${device.mobile} {
    height: 48px;
  }
`;

const NotFoundWrapper = styled.div`
  position: relative;
  top: 10vh;
  left: 0;
  right: 0;
  margin: 0 auto;
`;

export default Home;
