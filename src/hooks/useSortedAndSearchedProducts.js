import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductList } from 'store/productSlice';
import SortByConstant from 'constants/sortBy';

const actionTypes = {
  setSortBy: 'setSortby',
  setSearch: 'setSearch',
  setJustMounted: 'setJustMounted',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.setSortBy:
      return { ...state, sortBy: action.sortBy };
    case actionTypes.setSearch:
      return { ...state, search: action.search };
    case actionTypes.setJustMounted:
      return { ...state, justMounted: false };
    default:
      return state;
  }
};

const useSortedAndSearchedProducts = (
  initialSortBy = SortByConstant.recentlyAdded,
  initialSearch = '',
) => {
  const { isLoading, byIds, ids, isFirstLoad } = useSelector(
    (state) => state.product,
  );
  const [state, setState] = React.useReducer(reducer, {
    sortBy: initialSortBy,
    search: initialSearch,
    justMounted: true,
  });
  const productList = React.useMemo(
    () => (ids ? ids.map((id) => byIds[id]) : null),
    [ids, byIds],
  );
  const { sortBy, search, justMounted } = state;
  const dispatch = useDispatch();

  const setSortBy = React.useCallback((newSortBy) => {
    console.log('new sort by: ', newSortBy);
    setState({ type: actionTypes.setSortBy, sortBy: newSortBy });
  }, []);

  const setSearch = React.useCallback((newSearch) => {
    setState({ type: actionTypes.setSearch, search: newSearch });
  }, []);

  React.useEffect(() => {
    const debounce = setTimeout(() => {
      console.log('search for', search, sortBy);
      dispatch(getProductList({ sortBy, search })).unwrap();
    }, 500);

    // when user move to other page, and return to this one, we don't want to fetch again
    if (!isFirstLoad && justMounted) clearTimeout(debounce);
    setState({ type: actionTypes.setJustMounted });
    return () => clearTimeout(debounce);
  }, [dispatch, sortBy, search]);

  return {
    productList,
    isLoading,
    setSortBy,
    setSearch,
    sortBy,
    search,
    isFirstLoad,
  };
};

export default useSortedAndSearchedProducts;
