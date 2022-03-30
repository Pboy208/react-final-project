const httpStatusHandlerMiddleware = (store) => (next) => (action) => {
  console.log(action);
  const status = action.meta?.requestStatus || null;
  if (!status) return next(action);
  const stateName = action.type.split('/')[0];
  store.dispatch({
    type: `${stateName}/setIsLoading`,
    payload: status === 'pending',
  });
  return next(action);
};

export default httpStatusHandlerMiddleware;
