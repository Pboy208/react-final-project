export const formatVnd = (n) => n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " vnd";

const baseUrl = "http://localhost:3000";

const generateUrlWithParams = (givenUrl, params) => {
    const url = new URL(givenUrl);
    const urlSearchParams = new URLSearchParams();
    for (let key in params) {
        urlSearchParams.set(key, params[key]);
    }
    url.search = urlSearchParams;
    return url;
};

export const createRequest = ({
    endpoint,
    method = "GET",
    body = null,
    token = null,
    params = null,
}) => {
    const url = baseUrl + endpoint;
    const requestUrl = params ? generateUrlWithParams(url, params) : url;
    const requestConfig = {
        method,
        headers: {
            authorization: token ? `Bearer ${token}` : null,
            accept: "application/json",
            "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : null,
    };
    return [requestUrl, requestConfig];
};
