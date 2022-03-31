import { createRequest } from 'utils/request';

export const login = async (loginInfo) =>
  createRequest({
    endpoint: '/login',
    body: loginInfo,
    method: 'POST',
  });

export const register = async (registerInfo) =>
  createRequest({
    endpoint: '/register',
    body: registerInfo,
    method: 'POST',
  });
