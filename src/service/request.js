// 导入axios
import axios from 'axios';
// 初始化axios
const service = axios.create({
  baseURL: process.env.REACT_APP_BASE_API,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
  withCredentials: true,
  timeout: process.env.NODE_ENV === 'production' ? 5000 : 0,
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  },
);

// response interceptor
service.interceptors.response.use(
  // eslint-disable-next-line consistent-return
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default service;

export function post(url, params = {}) {
  return service({
    method: 'POST',
    url,
    data: params,
  });
}

export function get(url, params = {}) {
  return service({
    method: 'GET',
    url,
    params,
  });
}
