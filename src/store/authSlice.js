/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import decode from 'jwt-decode';
import * as authApi from 'api/authAPIs';

export const login = createAsyncThunk('auth/login', (loginInfo) =>
  authApi.login(loginInfo),
);

export const register = createAsyncThunk('auth/login', (registerInfo) =>
  authApi.register(registerInfo),
);

const initialState = {
  isLoggedIn: false,
  userName: '',
  isLoading: false,
};

const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const decodedToken = decode(token);
    return !!decodedToken.userId;
  } catch (e) {
    return false;
  }
};

const token = localStorage.getItem('token');

if (isTokenValid(token)) {
  initialState.isLoggedIn = true;
  initialState.userName = decode(token).userName;
} 

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isLoggedIn = false;
      state.userName = '';
      localStorage.removeItem('token');
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    resetAuthState: (state) => {
      state.isLoggedIn = false;
      state.userName = '';
      state.isLoading = false;
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      localStorage.setItem('token', action.payload.data);
      state.isLoggedIn = true;
      state.userName = decode(action.payload.data).userName;
    },
    [register.fulfilled]: (state, action) => {
      localStorage.setItem('token', action.payload.data);
      state.isLoggedIn = true;
      state.userName = decode(action.payload.data).userName;
    },
  },
});

export default authSlice.reducer;

export const { logIn, logout, resetAuthState } = authSlice.actions;
