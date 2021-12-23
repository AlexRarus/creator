import React, { useEffect, useState } from 'react';
import { InputText } from 'src/components/input-text';
import Popup from 'src/components/popup';
import { SwatchesPicker } from 'react-color';
import Color from 'color';

import { IProps } from './interfaces';
import { ColorPreviewWrapper, ColorPreview } from './style';

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
  const handleChangeColor = (color: any, event: any) => {
    handleChange(color?.hex?.toUpperCase());
  };

  const handleOpenPicker = () => setOpenPicker(true);
  const handleClosePicker = () => setOpenPicker(false);

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
      <Popup
        isOpen={isOpenPicker}
        openerElement={colorPreviewElement}
        onClose={handleClosePicker}
        position='bottom'
        horizontalAlign='start'
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
    </>
  );
});
