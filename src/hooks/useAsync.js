import * as React from 'react';

function useSafeDispatch(dispatch) {
  const mounted = React.useRef(false);

  React.useLayoutEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return React.useCallback(
    (...args) => (mounted.current ? dispatch(...args) : null),
    [dispatch],
  );
}

const actionTypes = {
  pending: 'pending',
  resolved: 'resolved',
  rejected: 'rejected',
};

function asyncReducer(state, action) {
  switch (action.type) {
    case actionTypes.pending: {
      return { status: 'pending', data: null, error: null };
    }
    case actionTypes.resolved: {
      return { status: 'resolved', data: action.data, error: null };
    }
    case actionTypes.rejected: {
      return { status: 'rejected', data: null, error: action.error };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function useAsync(initialState) {
  const [state, unsafeDispatch] = React.useReducer(asyncReducer, {
    status: 'idle',
    data: null,
    error: null,
    ...initialState,
  });
  const dispatch = useSafeDispatch(unsafeDispatch);
  const { data, error, status } = state;

  const handleRequest = React.useCallback(
    (promise) => {
      dispatch({ type: actionTypes.pending });
      promise
        .then((response) => {
          dispatch({ type: actionTypes.resolved, data: response.data });
        })
        .catch((rejectedError) => {
          dispatch({ type: actionTypes.rejected, error: rejectedError });
        });
    },
    [dispatch],
  );

  const setData = React.useCallback(
    (newData) => dispatch({ type: actionTypes.resolved, data: newData }),
    [dispatch],
  );

  const setError = React.useCallback(
    (newError) => dispatch({ type: actionTypes.rejected, error: newError }),
    [dispatch],
  );

  return {
    setData,
    setError,
    error,
    status,
    data,
    handleRequest,
  };
}

export default useAsync;
