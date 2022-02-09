import { useCallback, useState } from 'react';
import { AxiosResponse } from 'axios';
import API from 'src/api/index';
import { IThemeWrite as DataForServer } from 'src/dal/themes/interfaces';

export const useSubmitThemeForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>(null);
  const [data, setData] = useState<any>(null);

  const sendRequest = useCallback(async (dataForServer: DataForServer) => {
    setIsLoading(true);
    const { animation, ...restDataForServer } = dataForServer;
    const formData = new FormData();

    Object.keys(restDataForServer).forEach((key: string) => {
      formData.append(key, restDataForServer[key]);
    });

    if (animation || animation === null) {
      formData.append('animation', animation as File);
    }

    try {
      let response: AxiosResponse<any>;
      if (!dataForServer.id) {
        response = await API.endpoints.themes.createTheme(formData);
      } else {
        response = await API.endpoints.themes.updateTheme(formData);
      }
      setErrors(null);
      setData(response.data);
    } catch (error) {
      if (error?.response?.status === 400) {
        setErrors(error.response.data || null);
      }
    }
    setIsLoading(false);
  }, []);

  // todo здесь просто добавил типы чтобы были подсказки в IDE
  return [sendRequest, isLoading, data, errors] as [
    (dataForServer: DataForServer) => Promise<any>,
    boolean,
    any,
    any
  ];
};
