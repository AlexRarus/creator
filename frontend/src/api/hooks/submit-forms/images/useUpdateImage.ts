import { useCallback, useState } from 'react';
import { AxiosResponse } from 'axios';
import API from 'src/api/index';
import { IImage } from 'src/dal/images/interfaces';
import { IWriteImage } from 'src/api/endpoints/images';

export const useUpdateImage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [errors, setErrors] = useState<any>(null);

  const sendRequest = useCallback(async (image: IWriteImage) => {
    setIsLoading(true);
    const formData = new FormData();

    Object.keys(image).forEach((key: string) => {
      const value = image[key];

      if (Array.isArray(value)) {
        value.forEach((valueItem: any) => {
          formData.append(key, valueItem);
        });
        return;
      }

      formData.append(key, value);
    });

    try {
      const response: AxiosResponse<any> = await API.endpoints.images.updateImage(formData);

      setData(response.data);
      setErrors(null);
    } catch (error) {
      if (error?.response?.status === 400) {
        setErrors(error.response.data || null);
      }
      console.log('updateImage [ERROR]', error);
    }

    setIsLoading(false);
  }, []);

  return [sendRequest, isLoading, data, errors] as [
    (image: IWriteImage) => Promise<any>,
    boolean,
    IImage,
    any
  ];
};
