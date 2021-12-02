import { useState, useCallback } from 'react';
import { AxiosResponse } from 'axios';
import API from 'src/api';
import { ISetAvatar as DataForServer } from 'src/api/endpoints/auth';

export const useSubmitAvatarForm = <FormInputs>() => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormInputs | null>(null);
  const [data, setData] = useState<DataForServer | null>(null);

  const sendRequest = useCallback(async (dataForServer: DataForServer) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      const { sourceFile, previewFile, ...restFields } = dataForServer;

      if (sourceFile) {
        formData.append('sourceFile', sourceFile as File);
      }
      if (previewFile) {
        formData.append('previewFile', previewFile as File);
      }

      Object.keys(restFields).forEach((key: string) => {
        formData.append(key, restFields[key]);
      });
      const response: AxiosResponse<any> = await API.endpoints.auth.setAvatar(formData);

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
