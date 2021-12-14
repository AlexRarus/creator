import { useCallback, useState } from 'react';
import API from 'src/api/index';
import { v4 as uuidv4 } from 'uuid';

export interface IUploadingFile {
  guid: string; // уникальная строка
  isLoading: boolean;
  file: File;
  result: 'pending' | 'success' | 'fail';
}

export const useUploadImages = (blockType: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<IUploadingFile[]>([]);

  const sendRequest = useCallback(async (files: File[]) => {
    setIsLoading(true);

    // закидываем все файлы которые нужно загрузить в очередь на загрузку
    setUploadingFiles(
      files.map((file: File) => ({
        guid: uuidv4(),
        isLoading: true,
        file,
        result: 'pending',
      }))
    );

    // проходим по каждому файлу в очереди и закидываем его на сервер разными запросами
    await Promise.all(
      files.map(async (file: File) => {
        const formData = new FormData();
        formData.append('file', file as File);

        try {
          await API.endpoints.images.createImage(blockType, formData);

          // обновляем статус выгружаемого файла
          setUploadingFiles((uploadingFiles) =>
            uploadingFiles.map((uploadingFile: IUploadingFile) =>
              uploadingFile.file === file
                ? {
                    ...uploadingFile,
                    isLoading: false,
                    result: 'success',
                  }
                : uploadingFile
            )
          );
        } catch (e) {
          // обновляем статус выгружаемого файла
          setUploadingFiles((uploadingFiles) =>
            uploadingFiles.map((uploadingFile: IUploadingFile) =>
              uploadingFile.file === file
                ? {
                    ...uploadingFile,
                    isLoading: false,
                    result: 'fail',
                  }
                : uploadingFile
            )
          );
        }
      })
    );

    setIsLoading(false);
  }, []);

  const clear = () => setUploadingFiles([]);

  return [sendRequest, isLoading, uploadingFiles, clear] as [
    (files: File[]) => Promise<any>,
    boolean,
    IUploadingFile[],
    () => void
  ];
};
