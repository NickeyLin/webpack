import axios from "axios";

// request拦截器
axios.interceptors.request.use(
  config => {
    // 默认设置
    config.timeout = 15000;
  },
  error => {
    return Promise.reject(error);
  }
);

// response拦截器
axios.interceptors.response.use(
  response => {
    // 通用响应处理
    return response;
  },
  error => {
    Promise.reject(error);
  }
);

export default axios;
