import React, { useEffect, useState } from 'react';
import Modal, { MobileSize } from 'src/components/modal';
import { Form } from 'src/components/form';
import { useForm } from 'react-hook-form';
import InputRange from 'src/components/input-range';
import { ControlledField } from 'src/components/controlled-field';
import { useSubmitAvatarForm } from 'src/api/hooks/submit-forms/auth/useSubmitAvatarForm';
import { FileUploader } from 'src/components/file-uploader';
import AvatarEditor from 'react-avatar-editor';
import { IAvatar } from 'src/dal/auth/interfaces';

import { FormInputs, RawData } from './interfaces';
import { prepareDataForServer } from './utils';
import {
  AvatarEditorWrapper,
  ControlsWrapper,
  FileUploaderField,
  FileUploaderLabel,
  FormRow,
} from './style';

interface IProps {
  onClose(): void;
  onSuccess?(data: any): void;
  avatar?: IAvatar;
}

const DEFAULT_IMAGE_SIZE = 200;
const EDITOR_BORDER = 50;

export const AvatarEditModal = (props: IProps) => {
  const { onClose, onSuccess, avatar } = props;
  const [avatarEditorWrapper, avatarEditorWrapperRefCallback] = useState<HTMLDivElement | null>(
    null
  );
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });
  const [imageSize, setImageSize] = useState<number>(DEFAULT_IMAGE_SIZE);
  const [editor, editorRefCallback] = useState<any>();
  const [imageInfo, setImageInfo] = useState<any>();
  const { handleSubmit, formState, control, watch, setValue } = useForm<FormInputs>({
    defaultValues: {
      borderRadiusPercent:
        avatar?.borderRadius !== undefined
          ? avatar.borderRadius * 2 // храним в базе значение от 0 до 50, а на форме от 0 до 100
          : 100,
      scalePercent: avatar?.scale ? avatar.scale * 100 : 120,
      rotate: avatar?.rotate || 0,
    },
  });
  const [submitAvatarForm, isLoading, data, errors] = useSubmitAvatarForm();
  const sourceFile = watch('sourceFile');
  const borderRadiusPercent = parseFloat(watch('borderRadiusPercent') as any) || 0;
  const scalePercent = parseFloat(watch('scalePercent') as any) || 0;
  const rotate = watch('rotate');
  const maxBorderRadius = imageSize / 2 - EDITOR_BORDER;

  useEffect(() => {
    if (imageInfo) {
      // инициализация канваса сразу после того как загрузилось изображение
      const { width: imageWidth, height: imageHeight } = imageInfo;
      const correctImageSizeWidth = (imageSize - 2 * EDITOR_BORDER) / 2;
      const correctImageSIzeHeight = (imageSize - 2 * EDITOR_BORDER) / 2;
      const scale = scalePercent / 100;

      const shiftXToCenterCanvasWindow = correctImageSizeWidth / (imageWidth * scale);
      const shiftYToCenterCanvasWindow = correctImageSIzeHeight / (imageHeight * scale);
      const positionCenterX = avatar?.x !== undefined ? avatar.x + shiftXToCenterCanvasWindow : 0.5;
      const positionCenterY = avatar?.y !== undefined ? avatar.y + shiftYToCenterCanvasWindow : 0.5;

      // инициализация центра области preview
      setPosition({
        x: positionCenterX,
        y: positionCenterY,
      });
    }
  }, [imageInfo]);

  useEffect(() => {
    if (avatarEditorWrapper) {
      const fullWidth = avatarEditorWrapper.getBoundingClientRect().width;
      setImageSize(Math.max(fullWidth, DEFAULT_IMAGE_SIZE));
    }
  }, [avatarEditorWrapper]);

  const submit = async (data: FormInputs) => {
    if (editor) {
      const rect = editor.getCroppingRect();
      const { height, width, x, y } = rect;
      const rawData: RawData = {
        ...data,
        width, // значение от 0 до 1 (процент ширины изображения который отображается в обрезанной области)
        height, // значение от 0 до 1 (процент высоты изображения который отображается в обрезанной области)
        x, // значение от 0 до 1 (процент ширины изображения на который оно смещено)
        y, // значение от 0 до 1 (процент высоты изображения на который оно смещено)
        borderRadius: data.borderRadiusPercent / 2, // храним в базе значение от 0 до 50, а на форме от 0 до 100
        scale: data.scalePercent / 100,
      };

      if (sourceFile) {
        rawData.sourceFile = sourceFile;
      }

      // получаем ОБРЕЗАННОЕ изображение (Preview)
      const canvas = editor.getImage().toDataURL();
      const previewBlob = await fetch(canvas).then((res) => res.blob());
      const avatarSourceArray = avatar?.source?.split('/') || [];
      const fileName: string = sourceFile?.name || avatarSourceArray[avatarSourceArray.length - 1];
      rawData.previewFile = new File([previewBlob], `preview_${fileName}`);

      await submitAvatarForm(prepareDataForServer(rawData));
    }
  };

  // форма успешно (без ошибок) отправлена
  useEffect(() => {
    if (!isLoading && formState.isSubmitSuccessful && !errors && data) {
      onSuccess && onSuccess(data as any);
      onClose(); // При УСПЕШНОЙ отправке формы закрываем ее
    }
  }, [formState, errors, data, isLoading]);

  const onAction = (actionId: string) => {
    switch (actionId) {
      case 'submit':
        handleSubmit(submit)();
        // тут фому НЕ закрываем так как с бэка могли вернуться ошибки
        break;
      case 'cancel':
        onClose();
        break;
      default:
        console.warn('Unknown action type', actionId);
    }
  };

  const onPositionChange = (position: { x: number; y: number }) => setPosition(position);
  const onLoadSuccess = (imageInfo: any) => setImageInfo(imageInfo);

  const avatarSource: any = avatar?.source
    ? `${window.location.origin}/media/${avatar?.source}`
    : '';
  const image: any = sourceFile || avatarSource;

  return (
    <Modal
      onClose={onClose}
      mobileSize={MobileSize.L}
      title='Редактирование аватара'
      isCloseOutside={false}>
      <Form onAction={onAction} isLoading={isLoading}>
        <AvatarEditorWrapper ref={avatarEditorWrapperRefCallback}>
          <ControlsWrapper>
            <FileUploaderField>
              {Boolean(sourceFile) && <FileUploaderLabel>Выбран файл: </FileUploaderLabel>}
              <ControlledField name='sourceFile' control={control}>
                <FileUploader maxSize={25} title='Выбрать новый файл' accept='.jpeg,.png,.webp' />
              </ControlledField>
            </FileUploaderField>
          </ControlsWrapper>
          <AvatarEditor
            ref={editorRefCallback}
            image={image}
            width={Math.abs(imageSize - 2 * EDITOR_BORDER)}
            height={Math.abs(imageSize - 2 * EDITOR_BORDER)}
            color={[255, 255, 255, 0.6]} // RGBA
            border={EDITOR_BORDER}
            borderRadius={(maxBorderRadius * borderRadiusPercent) / 100}
            scale={scalePercent / 100 || 1}
            rotate={rotate}
            position={position}
            onPositionChange={onPositionChange}
            onLoadSuccess={onLoadSuccess}
          />
          <ControlsWrapper>
            <FormRow>
              <ControlledField name='borderRadiusPercent' control={control}>
                <InputRange
                  label='Скругление'
                  min={0}
                  max={100}
                  step={1}
                  minValueLabel='0%'
                  maxValueLabel='100%'
                  valueLabel={`${borderRadiusPercent}%`}
                  withInput={true}
                  toFixed={0}
                />
              </ControlledField>
            </FormRow>
            <FormRow>
              <ControlledField name='scalePercent' control={control}>
                <InputRange
                  label='Увеличение'
                  min={100}
                  max={200}
                  step={1}
                  minValueLabel='100%'
                  maxValueLabel='200%'
                  valueLabel={`${scalePercent}%`}
                  withInput={true}
                />
              </ControlledField>
            </FormRow>
          </ControlsWrapper>
        </AvatarEditorWrapper>
      </Form>
    </Modal>
  );
};
