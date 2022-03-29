import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductList } from '../store/productSlice';

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_SORT_BY':
      return { ...state, sortBy: action.sortBy };
    case 'SET_SEARCH':
      return { ...state, search: action.search };
    case 'SET_JUST_MOUNTED':
      return { ...state, justMounted: false };
    default:
      return state;
  }
};

const useSortedAndSearchedProducts = (
  initialSortBy = 'CREATED_TIME',
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
    () => ids.map((id) => byIds[id]),
    [ids, byIds],
  );
  const { sortBy, search, justMounted } = state;
  const dispatch = useDispatch();

  const setSortBy = React.useCallback((newSortBy) => {
    setState({ type: 'SET_SORT_BY', sortBy: newSortBy });
  }, []);

  const setSearch = React.useCallback((newSearch) => {
    setState({ type: 'SET_SEARCH', search: newSearch });
  }, []);

  React.useEffect(() => {
    const debounce = setTimeout(() => {
      dispatch(getProductList({ sortBy, search })).unwrap();
    }, 500);

    // when user move to other page, and return to this one, we don't want to fetch again
    if (!isFirstLoad && justMounted) clearTimeout(debounce);
    setState({ type: 'SET_JUST_MOUNTED' });
    return () => clearTimeout(debounce);
  }, [dispatch, sortBy, search]);

  return { productList, isLoading, setSortBy, setSearch, sortBy, search };
};

export default useSortedAndSearchedProducts;
