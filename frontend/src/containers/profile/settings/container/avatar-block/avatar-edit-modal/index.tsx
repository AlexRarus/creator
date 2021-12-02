import React, { useEffect, useState } from 'react';
import Modal, { MobileSize } from 'src/components/modal';
import { Form } from 'src/components/form';
import { useForm } from 'react-hook-form';
import { InputRange } from 'src/components/input-range';
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
  const [initialized, setInitialized] = useState(false);
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });
  const [imageSize, setImageSize] = useState<number>(DEFAULT_IMAGE_SIZE);
  const [editor, editorRefCallback] = useState<any>();
  const [imageInfo, setImageInfo] = useState<any>();
  const maxBorderRadius = imageSize / 2;
  const { handleSubmit, formState, control, watch, setValue } = useForm<FormInputs>({
    defaultValues: {
      borderRadius: avatar ? (avatar.borderRadius / 100) * imageSize : maxBorderRadius,
      scale: avatar?.scale || 1.2,
      rotate: avatar?.rotate || 0,
    },
  });
  const [submitAvatarForm, isLoading, data, errors] = useSubmitAvatarForm();
  const sourceFile = watch('sourceFile');
  const borderRadius = watch('borderRadius');
  const scale = watch('scale');
  const rotate = watch('rotate');

  useEffect(() => {
    if (!initialized && imageInfo) {
      // инициализация канваса сразу после того как загрузилось изображение
      const { width: imageWidth, height: imageHeight } = imageInfo;
      const halfCanvasImageWindow = imageSize / 2;
      const shiftXToCenterCanvasWindow = halfCanvasImageWindow / (imageWidth * scale);
      const shiftYToCenterCanvasWindow = halfCanvasImageWindow / (imageHeight * scale);
      const positionCenterX = avatar ? avatar.x + shiftXToCenterCanvasWindow : 0.5;
      const positionCenterY = avatar ? avatar.y + shiftYToCenterCanvasWindow : 0.5;
      setInitialized(true);

      // инициализация центра области preview
      setPosition({
        x: positionCenterX,
        y: positionCenterY,
      });
      // инициализация borderRadius
      setValue('borderRadius', avatar ? (avatar.borderRadius / 100) * imageSize : maxBorderRadius);
    }
  }, [imageSize, imageInfo, avatar, scale]);

  useEffect(() => {
    if (avatarEditorWrapper) {
      const fullWidth = avatarEditorWrapper.getBoundingClientRect().width;
      setImageSize(Math.max(fullWidth - 2 * EDITOR_BORDER, DEFAULT_IMAGE_SIZE));
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
        borderRadius: (borderRadius / imageSize) * 100, // вычисляем процентное значение
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

  const image: any = sourceFile || `${window.location.origin}/media/${avatar?.source}`;

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
                <FileUploader maxSize={25} title='Выбрать новый файл' accept='.jpeg,.png' />
              </ControlledField>
            </FileUploaderField>
          </ControlsWrapper>
          <AvatarEditor
            ref={editorRefCallback}
            image={image}
            width={imageSize}
            height={imageSize}
            color={[255, 255, 255, 0.6]} // RGBA
            border={EDITOR_BORDER}
            borderRadius={parseFloat(borderRadius as any)}
            scale={parseFloat(`${scale || 1}` as any)}
            rotate={rotate}
            position={position}
            onPositionChange={onPositionChange}
            onLoadSuccess={onLoadSuccess}
          />
          <ControlsWrapper>
            <FormRow>
              <ControlledField name='borderRadius' control={control}>
                <InputRange
                  label='Скругление'
                  min={0}
                  max={maxBorderRadius}
                  step={1}
                  minValueLabel='0%'
                  maxValueLabel='100%'
                  valueLabel={`${Math.round((borderRadius / maxBorderRadius) * 100)}%`}
                />
              </ControlledField>
            </FormRow>
            <FormRow>
              <ControlledField name='scale' control={control}>
                <InputRange
                  label='Увеличение'
                  min={1}
                  max={2}
                  step={0.01}
                  minValueLabel='100%'
                  maxValueLabel='200%'
                  valueLabel={`${Math.round(scale * 100)}%`}
                />
              </ControlledField>
            </FormRow>
          </ControlsWrapper>
        </AvatarEditorWrapper>
      </Form>
    </Modal>
  );
};
