import { useCallback, useState } from 'react';
import { AxiosResponse } from 'axios';
import API from 'src/api/index';
import { IWritePage as DataForServer } from 'src/api/endpoints/pages';

/**
 * partialUpdate - в базе будут обновлены только те поля которые отправлены
 * @param partialUpdate
 */
export const useSubmitPageForm = <FormInputs>(partialUpdate = true) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormInputs | null>(null);
  const [data, setData] = useState<DataForServer | null>(null);

  const sendRequest = useCallback(async (dataForServer: DataForServer) => {
    setIsLoading(true);
    try {
      let response: AxiosResponse<any>;
      if (!dataForServer.id) {
        response = await API.endpoints.pages.createPage(dataForServer);
      } else if (partialUpdate) {
        response = await API.endpoints.pages.partialUpdatePage(dataForServer);
      } else {
        response = await API.endpoints.pages.updatePage(dataForServer);
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
    (dataForServer: DataForServer) => Promise<any>,
    boolean,
    DataForServer | null,
    FormInputs | null
  ];
};
