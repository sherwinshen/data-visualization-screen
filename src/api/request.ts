import axios from "axios";

const service = axios.create({
  baseURL: "https://book.youbaobao.xyz:18082",
  timeout: 1000,
});

service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (response.status === 200) {
      return res;
    } else {
      const errMsg = res.msg || "请求失败";
      return Promise.reject(new Error(errMsg));
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
