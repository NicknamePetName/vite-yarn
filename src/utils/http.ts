import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { getStorage } from './storage';
// 创建axios实例
const instance = axios.create({
  // baseURL: 'http://localhost:8080/api',// 设置API的基础URL
  baseURL: 'http://192.168.20.193:8888',// 设置API的基础URL
  timeout: 5000,
});

// 存储请求标识和定时器的Map
// const requestMap: Map<string, NodeJS.Timeout> = new Map();
const requestMap: Map<string, NodeJS.Timeout> = new Map<string, NodeJS.Timeout>();

// 请求拦截器
instance.interceptors.request.use(
  (config: AxiosRequestConfig): any => {
    // 防止重复发起请求，提交表单

    // 创建请求标识，可以是请求的URL和参数的组合
    const requestKey = `${config.method}:${config.url}:${JSON.stringify(config.params)}`;
    
    // 检查是否已经存在相同的请求
    if (requestMap.has(requestKey) && config.url !== '/user/isLogin') {
      // 如果存在，阻止请求发送
      return Promise.reject(new Error('数据正在处理，请勿重复提交'));
    }

    // 可在请求发送前对config进行修改，如添加请求头等
    const token = getStorage('token')
    if (token) {
      //后台给登录用户设置的token的键时什么，headers['''']里的键也应该保持一致
      config.headers['token'] = token
    }

    // 设置定时器，1秒后从Map中删除请求标识
    const timeout = setTimeout(() => {
      requestMap.delete(requestKey);
    }, 1000);

    // 将请求标识和定时器存入Map
    requestMap.set(requestKey, timeout);

    return config;
  },
  (error: AxiosError) => {
    // 处理请求错误
    return Promise.reject(error)
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 对响应数据进行处理
    return response
  },
  (error: AxiosError) => {
    // 处理响应错误
    return Promise.reject(error)
  }
);

export default instance
