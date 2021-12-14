import { AxiosRequestConfig } from 'axios';

import { IAPI } from './interfaces';
import auth from './endpoints/auth';
import pages from './endpoints/pages';
import themes from './endpoints/themes';
import blocks from './endpoints/blocks';
import images from './endpoints/images';
import { axiosInstance } from './axios-instance';

// кофигурации запросов на сервер для разных end-points
// все методы запросов должны присутствовать в `domains`
const domains = {
  auth,
  pages,
  blocks,
  images,
  themes,
};

/**
 * возвращаем метод для запроса, в него принимаем параметры запроса
 * создаем окончательную конфигурацию запроса вместе с переданными параметрами
 * @param requestConfigurator
 */
function createRequest(requestConfigurator: any) {
  return (...params: IAnyValues[]) => {
    const config: AxiosRequestConfig = requestConfigurator(...params);
    return axiosInstance(config);
  };
}

// создание методов запросов из конфига
const createMethods = (endpointConfig: any) =>
  // проходим по каждому полю конфига и создаем из них методы запросов ['getById', 'getList',]
  Object.keys(endpointConfig).reduce((methods, configRequestName: string) => {
    // конфигуратор одного конкретного запроса (функция которая возвращает конфиг)
    const requestConfigurator = endpointConfig[configRequestName];
    methods[configRequestName] = createRequest(requestConfigurator); // создаем запрос

    return methods;
  }, {});

// проходимся по конфигам и создаем из них енд поинты запросов на сервер
const wrapAllByCreateMethods = (obj: IAnyValues): IAPI =>
  Object.keys(obj).reduce((endPoints: Partial<IAPI>, configName: string) => {
    // по очереди передаем каждый конфиг для создания методов запросов на его основе
    const endpointConfig = obj[configName];
    endPoints[configName] = createMethods(endpointConfig);
    return endPoints;
  }, {}) as IAPI;

export const createMethodsForBackendCall = wrapAllByCreateMethods(domains);
