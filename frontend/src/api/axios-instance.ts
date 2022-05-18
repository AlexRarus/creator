import axios, { AxiosInstance } from 'axios';
import { isSsr } from 'src/utils/detectEnvironment';

import { GlobalEventEmitter } from './event-emitter';

export type { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: isSsr ? `${process.env.SSR_API_URL}/api/v1/` : `/api/v1/`,
  validateStatus: (status) => status >= 200 && status < 400,
  timeout: 60000,
});

// если с бэка вернулся ответ 401 то разлогиниваем на фронте
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      GlobalEventEmitter.emit('logout401');
    }
    return Promise.reject(error);
  }
);
