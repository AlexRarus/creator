import React, { useEffect, useState } from 'react';
import Modal, { MobileSize } from 'src/components/modal';
import { Form } from 'src/components/form';
import { useForm } from 'react-hook-form';
import InputRange from 'src/components/input-range';
import { ControlledField } from 'src/components/controlled-field';
import AvatarEditor from 'react-avatar-editor';
import { IImage } from 'src/dal/images/interfaces';
import { useUpdateImage } from 'src/api/hooks/submit-forms/images/useUpdateImage';

import { FormInputs, RawData } from './interfaces';
import { prepareDataForServer } from './utils';
import { AvatarEditorWrapper, ControlsWrapper, FormRow } from './style';

interface IProps {
  onClose(): void;
  onSuccess(image: IImage): void;
  image: IImage;
  title?: string;
}

const DEFAULT_IMAGE_SIZE = 200;
const EDITOR_BORDER = 20;

export const ImageEditorModal = (props: IProps) => {
  const { onClose, onSuccess, image, title = 'Редактирование изображения' } = props;
  const [imageEditorWrapper, imageEditorWrapperRefCallback] = useState<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });
  const [imageSize, setImageSize] = useState<number>(DEFAULT_IMAGE_SIZE);
  const [editor, editorRefCallback] = useState<any>();
  const [imageInfo, setImageInfo] = useState<any>();
  const maxBorderRadius = imageSize / 2;
  const { handleSubmit, formState, control, watch, setValue } = useForm<FormInputs>({
    defaultValues: {
      borderRadius:
        image?.borderRadius !== undefined
          ? (image.borderRadius / 100) * imageSize
          : maxBorderRadius, // в форму должны подставить не процент а значение и пикселях
      scale: image?.scale || 1.2,
      rotate: image?.rotate || 0,
    },
  });
  const [updateImage, isLoading, data, errors] = useUpdateImage();
  const borderRadius = watch('borderRadius');
  const scale = watch('scale');
  const rotate = watch('rotate');

  useEffect(() => {
    if (imageInfo) {
      // инициализация канваса сразу после того как загрузилось изображение
      const { width: imageWidth, height: imageHeight } = imageInfo;
      const halfCanvasImageWindow = imageSize / 2;
      const shiftXToCenterCanvasWindow = halfCanvasImageWindow / (imageWidth * scale);
      const shiftYToCenterCanvasWindow = halfCanvasImageWindow / (imageHeight * scale);
      const positionCenterX = image?.x !== undefined ? image.x + shiftXToCenterCanvasWindow : 0.5;
      const positionCenterY = image?.y !== undefined ? image.y + shiftYToCenterCanvasWindow : 0.5;

      // инициализация центра области preview
      setPosition({
        x: positionCenterX,
        y: positionCenterY,
      });
      // инициализация borderRadius
      setValue(
        'borderRadius',
        image?.borderRadius !== undefined ? (image.borderRadius / 100) * imageSize : maxBorderRadius
      );
    }
  }, [imageInfo]);

  useEffect(() => {
    if (imageEditorWrapper) {
      const fullWidth = imageEditorWrapper.getBoundingClientRect().width;
      setImageSize(Math.max(fullWidth - 2 * EDITOR_BORDER, DEFAULT_IMAGE_SIZE));
    }
  }, [imageEditorWrapper]);

  const submit = async (data: FormInputs) => {
    if (editor) {
      const rect = editor.getCroppingRect();
      const { height, width, x, y } = rect;
      const rawData: RawData = {
        id: image.id,
        ...data,
        width, // значение от 0 до 1 (процент ширины изображения который отображается в обрезанной области)
        height, // значение от 0 до 1 (процент высоты изображения который отображается в обрезанной области)
        x, // значение от 0 до 1 (процент ширины изображения на который оно смещено)
        y, // значение от 0 до 1 (процент высоты изображения на который оно смещено)
        borderRadius: (borderRadius / imageSize) * 100, // вычисляем процентное значение
      };

      // получаем ОБРЕЗАННОЕ изображение (Preview)
      const canvas = editor.getImage().toDataURL();
      const previewBlob = await fetch(canvas).then((res) => res.blob());
      const imageSourceArray = image?.src?.split('/') || [];
      const fileName: string = imageSourceArray[imageSourceArray.length - 1];
      rawData.previewFile = new File([previewBlob], `preview_${fileName}`);

      await updateImage(prepareDataForServer(rawData));
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

  const imageSource: any = image?.src ? `${window.location.origin}/media/${image?.src}` : '';

  return (
    <Modal onClose={onClose} mobileSize={MobileSize.L} title={title} isCloseOutside={false}>
      <Form isLoading={isLoading} onAction={onAction}>
        <AvatarEditorWrapper ref={imageEditorWrapperRefCallback}>
          <AvatarEditor
            ref={editorRefCallback}
            image={imageSource}
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