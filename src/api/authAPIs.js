import { post } from 'utils/request';

export const login = (loginInfo) => post('/login', { body: loginInfo });

export const register = (registerInfo) =>
  post('/register', { body: registerInfo });
