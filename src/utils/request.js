/* eslint-disable no-param-reassign */
/* eslint-disable no-throw-literal */
/* eslint-disable import/prefer-default-export */
import { BASE_URL } from '../constants';

const generateUrlWithParams = (givenUrl, params) => {
  if (!params.search) params.search = '';
  const url = new URL(givenUrl);
  url.search = new URLSearchParams(params);
  return url;
};

const getToken = () => localStorage.getItem('token');

export const createRequest = async ({
  endpoint,
  method = 'GET',
  body = null,
  token = null,
  params = null,
}) => {
  const url = `${BASE_URL}${endpoint}`;
  const requestUrl = params ? generateUrlWithParams(url, params) : url;
  const requestConfig = {
    method,
    headers: {
      authorization: token ? `Bearer ${getToken()}` : null,
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : null,
  };

  const response = await fetch(requestUrl, requestConfig);
  const payload = await response.json();
  if (!response.ok)
    throw { code: response.status.toString(), message: payload.message };
  return payload;
};
