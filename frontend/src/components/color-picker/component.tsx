import React, { useEffect, useState } from 'react';
import { InputText } from 'src/components/input-text';
import Popup from 'src/components/popup';
import Modal from 'src/components/modal';
import { SwatchesPicker } from 'react-color';
import Color from 'color';
import { isMobile } from 'react-device-detect';

import { IProps } from './interfaces';
import { ColorPreviewWrapper, ColorPreview, PalleteWrapper } from './style';

export const ColorPicker = React.forwardRef((props: IProps, ref: any) => {
  const [color, setColor] = useState<any>();
  const [isOpenPicker, setOpenPicker] = useState(false);
  const [colorPreviewElement, colorPreviewRefCallback] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      setColor(props?.value?.length ? Color(props?.value) : null);
    } catch {
      setColor(null);
    }
  }, [props.value]);

  const handleChange = (value: string) => {
    props.onChange && props.onChange(value);
  };
  const handleOpenPicker = () => setOpenPicker(true);
  const handleClosePicker = () => setOpenPicker(false);

  const handleChangeColor = (color: any) => {
    handleChange(color?.hex?.toUpperCase());

    if (isMobile) {
      handleClosePicker();
    }
  };

  return (
    <>
      <InputText
        ref={ref}
        {...props}
        onChange={handleChange}
        maxLength={7}
        color={!color?.isDark() ? '#000000' : props.value}>
        <ColorPreviewWrapper>
          <ColorPreview
            onClick={handleOpenPicker}
            ref={colorPreviewRefCallback}
            background={props.value}
            hasBorder={!color?.isDark()}
          />
        </ColorPreviewWrapper>
      </InputText>
      {!isMobile && (
        <Popup
          isOpen={isOpenPicker}
          openerElement={colorPreviewElement}
          onClose={handleClosePicker}
          position='bottom'
          horizontalAlign='end'
          autoAlign={false}
          floatPosition={true}
          hasPointer={false}
          isCloseOnClick={false}
          plateMargin={4}
          maxHeight={300}
          zIndex={999}
          isFixed={true}>
          <SwatchesPicker onChange={handleChangeColor} />
        </Popup>
      )}
      {isMobile && isOpenPicker && (
        <Modal title='Выбор цвета' onClose={handleClosePicker}>
          <PalleteWrapper>
            <SwatchesPicker onChange={handleChangeColor} />
          </PalleteWrapper>
        </Modal>
      )}
    </>
  );
});
