import React, { useEffect, useRef, useState } from 'react';
import { InputText } from 'src/components/input-text';

import { ColorsModal } from './colors-modal';
import { IProps } from './interfaces';
import { ColorPreviewWrapper, ColorPreview } from './style';

const DEFAULT_COLOR_1 = '#0000FF';
const DEFAULT_COLOR_2 = '#FF0000';

const parseValueToBackground = (value: string, defaultColors: string[]) => {
  const preparedValue = `${value}`.replace(/linear-gradient\((.+)\)/, '$1');
  let background = preparedValue
    .replace(/,\s#/g, 'SPLIT#')
    .replace(/,\srgb/g, 'SPLITrgb')
    .split('SPLIT');

  background.shift();

  if (!background.length) {
    background = defaultColors.length ? defaultColors : [DEFAULT_COLOR_1, DEFAULT_COLOR_2];
  } else if (background.length === 1) {
    background = background.concat(background);
  }

  return background.join(', ');
};

/**
 * Компонент ожидает value = linear-gradient(to bottom, #0000FF, #FF0000)'
 * направление, цвета и количество цветов может быть любым
 * любое другое значение будет переписано на дефолное
 */
export const ColorPickerGradient = React.forwardRef((props: IProps, ref: any) => {
  const {
    value = 'linear-gradient(to bottom, #0000FF, #FF0000)',
    defaultColors: initDefaultColors,
  } = props;
  const [defaultColors] = useState(
    initDefaultColors?.length ? initDefaultColors : [DEFAULT_COLOR_1, DEFAULT_COLOR_2]
  );
  const [isOpenModal, setOpenModal] = useState(false);
  const [inputWidth, setInputWidth] = useState<number>(0);
  const innerRef = useRef();
  const currentRef = ref || innerRef;

  useEffect(() => {
    if (currentRef.current) {
      setInputWidth(currentRef.current.getBoundingClientRect().width);
    }
  }, []);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const onSuccess = (value: string) => {
    props?.onChange && props?.onChange(value);
  };

  return (
    <>
      <InputText
        ref={currentRef}
        {...props}
        value={value}
        onlyProgrammingChange={true}
        color={'rgba(255, 255, 255, 0)'}>
        <ColorPreviewWrapper inputWidth={inputWidth}>
          <ColorPreview
            onClick={handleOpenModal}
            background={parseValueToBackground(value, defaultColors)}
          />
        </ColorPreviewWrapper>
      </InputText>
      {isOpenModal && (
        <ColorsModal
          onClose={handleCloseModal}
          value={value}
          onSuccess={onSuccess}
          defaultColors={defaultColors}
        />
      )}
    </>
  );
});
