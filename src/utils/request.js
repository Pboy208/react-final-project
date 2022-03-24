import { BASE_URL } from "../constants";

const generateUrlWithParams = (givenUrl, params) => {
    if (!params.search) params.search = "";
    const url = new URL(givenUrl);
    url.search = new URLSearchParams(params);
    return url;
};

export const createRequest = async ({
    endpoint,
    method = "GET",
    body = null,
    token = null,
    params = null,
}) => {
    const url = BASE_URL + endpoint;
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
    try {
        const response = await fetch(requestUrl, requestConfig);
        const payload = await response.json();
        if (!response.ok) throw { code: response.status.toString(), message: payload.message };
        return payload;
    } catch (error) {
        throw error;
    }
};
