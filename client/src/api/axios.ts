import axios from 'axios';
import { CONSTANTS } from 'utilities/constants';
import { store } from '..';

const api = axios.create({
  baseURL: CONSTANTS.BASEAPI,
  headers: {
    'Content-type': 'application/json',
  },
});

api.interceptors.request.use(function (config: any) {
  const state: any = store.getState();
  if (state.auth.status) {
    const token = state?.auth?.userProfile?.accessToken;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return config;
});

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default api;
