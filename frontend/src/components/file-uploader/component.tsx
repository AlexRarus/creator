import React, { useState, useCallback } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { Informer } from 'src/components/informer';

import { IProps, IState } from './interfaces';
import {
  Wrapper,
  Title,
  Field,
  UploadContainer,
  Uploaded,
  UploadedText,
  Files,
  Input,
  ErrorIconStyled,
  CloseIconStyled,
  GetAppIconStyled,
  ErrorBlock,
  Error,
  InformerWrapper,
} from './style';

export const FileUploader = React.forwardRef((props: IProps, ref: any) => {
  const [state, setState] = useState<IState>({
    rejectedFiles: [],
    attachedFilesSize: 0,
    isShownDropArea: false,
  });
  const { rejectedFiles, attachedFilesSize, isShownDropArea } = state;
  const {
    value,
    onChange,

    maxSize = 5, // в мегабайтах
    title,
    multiple = false,
    width,
    className,
    accept,
    info,
  } = props;
  const maxSizeBytes: number = maxSize * 1000 * 1000; // в байтах

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      let sumFileSize: number = attachedFilesSize;
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
        onChange && onChange([...(value as File[]), ...validFiles]);
      } else {
        onChange && onChange(validFiles[0]);
      }

      setState({
        rejectedFiles: [...rejectedFiles, ...rejected],
        attachedFilesSize: sumFileSize,
        isShownDropArea: false,
      });
    },
    [attachedFilesSize, rejectedFiles]
  );

  const onClickRemoveFile = useCallback(
    (file: File) => () => {
      if (multiple) {
        const valueFiles = value as File[];
        onChange && onChange(valueFiles.filter((valueFile: File) => valueFile !== file));
      } else {
        onChange && onChange(null);
      }

      setState({
        rejectedFiles,
        attachedFilesSize: attachedFilesSize - file.size,
      });
    },
    [attachedFilesSize, rejectedFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: maxSizeBytes,
    multiple,
    accept,
  });

  const removeRejectedFiles = useCallback(
    (file: File) => () => {
      const rejected = [...rejectedFiles];
      rejected.splice(rejected.indexOf(file), 1);
      setState({
        rejectedFiles: rejected,
        attachedFilesSize,
      });
    },
    [rejectedFiles, attachedFilesSize]
  );

  const hasValue = Boolean(Array.isArray(value) ? value.length : value);
  const isEmptyFiles: boolean = !hasValue && !rejectedFiles.length;
  const inputProps: any = getInputProps();
  const multipleValue = value as File[] | null;
  const singleValue = value as File | null;

  return (
    <Wrapper width={width} className={className} ref={ref}>
      {hasValue && (
        <Files data-element='fileUploader-files'>
          {/* eslint-disable-next-line react/prop-types */}
          {multiple &&
            multipleValue &&
            multipleValue.map((file: File, i: number) => (
              <Uploaded data-element='fileUploader-uploadedFile' key={i}>
                <UploadedText data-element='fileUploader-fileDescription'>{file.name}</UploadedText>
                <CloseIconStyled
                  data-element='fileUploader-deleteFileIcon'
                  onClick={onClickRemoveFile(file)}
                />
              </Uploaded>
            ))}
          {!multiple && singleValue && (
            <Uploaded data-element='fileUploader-uploadedFile'>
              <UploadedText data-element='fileUploader-fileDescription'>
                {singleValue.name}
              </UploadedText>
              <CloseIconStyled
                data-element='fileUploader-deleteFileIcon'
                onClick={onClickRemoveFile(singleValue)}
              />
            </Uploaded>
          )}
        </Files>
      )}
      {rejectedFiles && !!rejectedFiles.length && (
        <Files data-element='fileUploader-files'>
          {rejectedFiles.map((file: File) => (
            <ErrorBlock key={file.name}>
              <Uploaded data-element='fileUploader-rejectedFile' isError={true}>
                <UploadedText data-element='fileUploader-fileDescription'>
                  {`Не загружен: ${file.name}`}
                </UploadedText>
                <ErrorIconStyled
                  data-element='fileUploader-deleteFileIcon'
                  onClick={removeRejectedFiles(file)}
                />
              </Uploaded>
              {file.size > maxSizeBytes && (
                <Error data-element='fileUploader-error'>Превышен размер файла</Error>
              )}
            </ErrorBlock>
          ))}
        </Files>
      )}
      {(isEmptyFiles || isShownDropArea) && (
        <Field {...getRootProps()} isDragActive={isDragActive}>
          <UploadContainer>
            <Input {...getInputProps()} />
            <GetAppIconStyled />
            <Title>{title}</Title>
            {info && (
              <InformerWrapper>
                <Informer position='right'>{info}</Informer>
              </InformerWrapper>
            )}
          </UploadContainer>
        </Field>
      )}
      {!isEmptyFiles && multiple && (
        <label>
          <UploadContainer>
            <Input {...inputProps} />
            <GetAppIconStyled />
            <Title>{title}</Title>
            {info && (
              <InformerWrapper>
                <Informer position='right'>{info}</Informer>
              </InformerWrapper>
            )}
          </UploadContainer>
        </label>
      )}
    </Wrapper>
  );
});
