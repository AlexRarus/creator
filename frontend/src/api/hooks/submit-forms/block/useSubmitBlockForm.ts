import { useState, useCallback } from 'react';
import { AxiosResponse } from 'axios';
import API from 'src/api';
import { IWriteBlock as DataForServer } from 'src/api/endpoints/blocks';

/**
 * partialUpdate - в базе будут обновлены только те поля которые отправлены
 * @param partialUpdate
 */
export const useSubmitBlockForm = <FormInputs>(partialUpdate = true) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormInputs | null>(null);
  const [data, setData] = useState<DataForServer<FormInputs> | null>(null);

  const sendRequest = useCallback(async (dataForServer: DataForServer<FormInputs>) => {
    setIsLoading(true);
    try {
      let response: AxiosResponse<any>;
      if (!dataForServer.id) {
        response = await API.endpoints.blocks.createBlock(dataForServer);
      } else if (partialUpdate) {
        response = await API.endpoints.blocks.partialUpdatePage(dataForServer);
      } else {
        response = await API.endpoints.blocks.updateBlock(dataForServer);
      }
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
    (dataForServer: DataForServer<FormInputs>) => Promise<any>,
    boolean,
    DataForServer<FormInputs> | null,
    FormInputs | null
  ];
};
