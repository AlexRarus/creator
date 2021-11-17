import { useState, useCallback } from 'react';
import { AxiosResponse } from 'axios';
import API from 'src/api';

import { DataForServer } from './interfaces';

// отправка формы создания/обновления блока
export const useSubmitBlockForm = <FormInputs>(): [
  (dataForServer: DataForServer<FormInputs>) => Promise<any>,
  boolean,
  DataForServer<FormInputs> | null,
  FormInputs | null
] => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormInputs | null>(null);
  const [data, setData] = useState<DataForServer<FormInputs> | null>(null);

  const sendRequest = useCallback(async (dataForServer: DataForServer<FormInputs>) => {
    setIsLoading(true);
    try {
      let response: AxiosResponse<any>;
      if (!dataForServer.id) {
        response = await API.endpoints.blocks.createBlock(dataForServer);
      } else {
        response = await API.endpoints.blocks.updateBlock(dataForServer);
      }
      setData(response.data);
    } catch (error) {
      if (error?.response?.status === 400) {
        setErrors(error.response.data || null);
      }
    }
    setIsLoading(false);
  }, []);

  return [sendRequest, isLoading, data, errors];
};
