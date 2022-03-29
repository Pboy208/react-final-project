/* eslint-disable no-undef */
import '@testing-library/jest-dom';
import initiateDB from './mocks/database/indexedDB';
import server from './mocks/server';

// mock indexedDB
initiateDB();

/**
 * fix: `matchMedia` not present, legacy browsers require a polyfill
 */
global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener() {},
      removeListener() {},
    };
  };

// enable API mocking in test runs using the same request handlers
// as for the client-side mocking.
beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
