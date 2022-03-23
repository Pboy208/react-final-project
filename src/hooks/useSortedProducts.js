import * as React from "react"
import useAsync from "./useAsync";

const useSortedProducts = (filter="CREATED_TIME")=>{
  const {error,status,data:productList,handleRequest} = useAsync();

  const generateUrl = React.useMemo(()=>{
    const url = new URL("http://localhost:3000/");
    const params = new URLSearchParams();
    params.set("filter",filter);
    url.search = params;
    return url;
  },[filter])

  React.useEffect=(()=>{
    const request =  fetch(generateUrl(),{    })
    handleRequest(request);
  },[filter])

  return {productList,status,error}
}

export default useSortedProducts;