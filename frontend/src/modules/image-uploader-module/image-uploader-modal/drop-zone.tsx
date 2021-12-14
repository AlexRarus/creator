import React, { useCallback } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

import { DropZoneWrapper, DropZoneIcon, DropZoneLabel, DropZoneInput } from './style';

export interface IProps {
  onChange?(value: File | File[] | null): void;
  multiple?: boolean;
  maxSize?: number;
  accept?: string; // example '.jpeg,.png'
}

export const DropZone = React.forwardRef((props: IProps, ref: any) => {
  const {
    onChange,
    maxSize = 15, // в мегабайтах
    multiple = false,
    accept,
  } = props;
  const maxSizeBytes: number = maxSize * 1000 * 1000; // в байтах

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    let sumFileSize = 0;
    const rejected: File[] = fileRejections.map(
      (fileRejection: FileRejection) => fileRejection.file
    );

    const validFiles: File[] = [];
    acceptedFiles.forEach((file: File) => {
      if (sumFileSize + file.size > maxSizeBytes) {
        rejected.push(file);
      } else {
        sumFileSize += file.size;
        validFiles.push(file);
      }
    });

    if (multiple) {
      onChange && onChange([...validFiles]);
    } else {
      onChange && onChange(validFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: maxSizeBytes,
    multiple,
    accept,
  });

  return (
    <DropZoneWrapper {...getRootProps()} isDragActive={isDragActive}>
      <DropZoneIcon ref={ref}>
        <InsertPhotoIcon />
      </DropZoneIcon>
      <DropZoneLabel>Загрузить</DropZoneLabel>
      <DropZoneInput {...getInputProps()} />
    </DropZoneWrapper>
  );
});
