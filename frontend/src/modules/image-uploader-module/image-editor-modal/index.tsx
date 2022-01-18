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
  isEditBorderRadius?: boolean;
  isEditBorder?: boolean;
}

const DEFAULT_IMAGE_SIZE = 200;
const MAX_EDITOR_BORDER = 100;
const DEFAULT_EDITOR_BORDER = 50;

export const ImageEditorModal = (props: IProps) => {
  const {
    onClose,
    onSuccess,
    image,
    title = 'Редактирование изображения',
    isEditBorderRadius = false,
    isEditBorder = false,
  } = props;
  const [imageEditorWrapper, imageEditorWrapperRefCallback] = useState<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });
  const [positionInitialized, setPositionInitialized] = useState(false);
  const [imageSize, setImageSize] = useState<number>(DEFAULT_IMAGE_SIZE);
  const [editor, editorRefCallback] = useState<any>();
  const [imageInfo, setImageInfo] = useState<any>();
  const parsedBorderX = parseFloat(image?.borderX as any);
  const parsedBorderY = parseFloat(image?.borderY as any);
  const { handleSubmit, formState, control, watch, setValue } = useForm<FormInputs>({
    defaultValues: {
      borderRadiusPercent:
        image?.borderRadius !== undefined
          ? image.borderRadius * 2 // храним в базе значение от 0 до 50, а на форме от 0 до 100
          : 100,
      scalePercent: image?.scale ? image.scale * 100 : 120,
      rotate: image?.rotate || 0,
      width: isNaN(parsedBorderX) ? DEFAULT_EDITOR_BORDER : MAX_EDITOR_BORDER - parsedBorderX,
      height: isNaN(parsedBorderY) ? DEFAULT_EDITOR_BORDER : MAX_EDITOR_BORDER - parsedBorderY,
    },
  });
  const [updateImage, isLoading, data, errors] = useUpdateImage();
  const borderRadiusPercent = parseFloat(watch('borderRadiusPercent') as any) || 0;
  const scalePercent = parseFloat(watch('scalePercent') as any) || 0;
  const rotate = watch('rotate');
  const width = parseFloat(watch('width') as any) || 0;
  const height = parseFloat(watch('height') as any) || 0;
  const borderX = MAX_EDITOR_BORDER - width;
  const borderY = MAX_EDITOR_BORDER - height;
  const maxBorder = Math.max(borderX, borderY);
  const maxBorderRadius = imageSize / 2 - maxBorder;

  useEffect(() => {
    if (imageInfo && !positionInitialized) {
      // инициализация канваса сразу после того как загрузилось изображение
      const { width: imageWidth, height: imageHeight } = imageInfo;
      const correctImageSizeWidth = (imageSize - 2 * borderX) / 2;
      const correctImageSIzeHeight = (imageSize - 2 * borderY) / 2;
      const scale = scalePercent / 100;

      const shiftXToCenterCanvasWindow = correctImageSizeWidth / (imageWidth * scale);
      const shiftYToCenterCanvasWindow = correctImageSIzeHeight / (imageHeight * scale);
      const positionCenterX = image?.x !== undefined ? image.x + shiftXToCenterCanvasWindow : 0.5;
      const positionCenterY = image?.y !== undefined ? image.y + shiftYToCenterCanvasWindow : 0.5;

      // инициализация центра области preview
      setPosition({
        x: positionCenterX,
        y: positionCenterY,
      });
    }
  }, [imageInfo]);

  useEffect(() => {
    if (imageEditorWrapper) {
      const fullWidth = imageEditorWrapper.getBoundingClientRect().width;
      setImageSize(Math.max(fullWidth, DEFAULT_IMAGE_SIZE));
    }
  }, [imageEditorWrapper]);

  const submit = async (data: FormInputs) => {
    if (editor) {
      const rect = editor.getCroppingRect();
      const { height, width, x, y } = rect;
      const rawData: RawData = {
        id: image.id,
        ...data,
        borderX,
        borderY,
        scale: data.scalePercent / 100,
        borderRadius: data.borderRadiusPercent / 2, // храним в базе значение от 0 до 50, а на форме от 0 до 100
        width, // значение от 0 до 1 (процент ширины изображения который отображается в обрезанной области)
        height, // значение от 0 до 1 (процент высоты изображения который отображается в обрезанной области)
        x, // значение от 0 до 1 (процент ширины изображения на который оно смещено)
        y, // значение от 0 до 1 (процент высоты изображения на который оно смещено)
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

  const onPositionChange = (position: { x: number; y: number }) => {
    setPosition(position);
    setPositionInitialized(true);
  };
  const onLoadSuccess = (imageInfo: any) => setImageInfo(imageInfo);

  const imageSource: any = image?.src ? `${window.location.origin}/media/${image?.src}` : '';

  return (
    <Modal onClose={onClose} mobileSize={MobileSize.L} title={title} isCloseOutside={false}>
      <Form isLoading={isLoading} onAction={onAction}>
        <AvatarEditorWrapper ref={imageEditorWrapperRefCallback}>
          <AvatarEditor
            ref={editorRefCallback}
            image={imageSource}
            width={Math.abs(imageSize - 2 * borderX)}
            height={Math.abs(imageSize - 2 * borderY)}
            color={[255, 255, 255, 0.6]} // RGBA
            border={[borderX, borderY]}
            borderRadius={(maxBorderRadius * borderRadiusPercent) / 100}
            scale={scalePercent / 100 || 1}
            rotate={rotate}
            position={position}
            onPositionChange={onPositionChange}
            onLoadSuccess={onLoadSuccess}
          />
          <ControlsWrapper>
            {isEditBorder && (
              <>
                <FormRow>
                  <ControlledField name='width' control={control}>
                    <InputRange
                      label='Ширина'
                      min={0}
                      max={MAX_EDITOR_BORDER}
                      step={1}
                      valueLabel={`${width}%`}
                      minValueLabel='Мин'
                      maxValueLabel='Макс'
                      withInput={true}
                    />
                  </ControlledField>
                </FormRow>
                <FormRow>
                  <ControlledField name='height' control={control}>
                    <InputRange
                      label='Высота'
                      min={0}
                      max={MAX_EDITOR_BORDER}
                      step={1}
                      valueLabel={`${height}%`}
                      minValueLabel='Мин'
                      maxValueLabel='Макс'
                      withInput={true}
                    />
                  </ControlledField>
                </FormRow>
              </>
            )}
            {isEditBorderRadius && (
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
            )}
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
