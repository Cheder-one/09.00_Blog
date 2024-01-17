import axios from 'axios';

const BASE_URL = 'https://blog.kata.academy/api/';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    // Authorization: `Bearer 'token'`
  },
});

const apiService = {
  get(url, params) {
    return api.get(url, params);
  },
  post(url, data) {
    return api.post(url, data);
  },
};

export default apiService;
