import axios from 'axios';

// const baseURL = process.env.REACT_APP_API_BASE_URL;
const instance = axios.create({
  // baseURL: `${baseURL}`,
  baseURL: 'https://myspringserver.store',
  headers: {
    'Content-Type': 'application/json'
  }
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
