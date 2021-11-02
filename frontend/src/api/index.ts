import { createMethodsForBackendCall } from './create-endpoints';
import { IAPI } from './interfaces';
import { axiosInstance } from './axios-instance';

export type { IGetListParams } from './interfaces';

export class API {
  public endpoints: IAPI = createMethodsForBackendCall;

  init(responseSuccess: any, responseFail: any) {
    axiosInstance.interceptors.response.use(responseSuccess, responseFail);
    return this;
  }

  setDefaultHeaders = (headers: any) => {
    Object.assign(axiosInstance.defaults.headers.common, headers);
  };

  removeDefaultHeaders = (headers: string[]) => {
    const commonHeaders = {
      ...axiosInstance.defaults.headers.common,
    };
    axiosInstance.defaults.headers.common = headers.reduce((commonHeaders, currentHeaderKey) => {
      delete commonHeaders[currentHeaderKey];

      return commonHeaders;
    }, commonHeaders);
  };
}

export default new API();
