import { useCallback, useState } from 'react';
import { AxiosResponse } from 'axios';
import API from 'src/api/index';
import { ISetUsername as DataForServer } from 'src/api/endpoints/auth';

export const useSubmitUsernameForm = <FormInputs>() => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormInputs | null>(null);
  const [data, setData] = useState<DataForServer | null>(null);

  const sendRequest = useCallback(async (dataForServer: DataForServer) => {
    setIsLoading(true);
    try {
      const response: AxiosResponse<any> = await API.endpoints.auth.setUsername(dataForServer);
      setData(response.data);
      setErrors(null);
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
    DataForServer | null,
    FormInputs | null
  ];
};
