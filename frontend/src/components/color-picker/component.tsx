import React, { FocusEvent, useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Popup from 'src/components/popup';
import { SwatchesPicker } from 'react-color';

import { IProps } from './interfaces';
import { ComponentWrapper, InputStyled, Label, ColoredPalette } from './style';

export const ColorPicker = React.forwardRef((props: IProps, ref: any) => {
  const { value, onChange, dimension = 'm', label, ...inputProps } = props;
  const [isOpenPicker, setOpenPicker] = useState(false);
  const [componentElement, componentRefCallback] = useState<HTMLElement | null>(null);
  const [uniqId] = useState(uuidv4());
  const innerRef = useRef();
  const currentRef = ref || innerRef;
  const [selectedColor, setColor] = useState<string>(value || '');

  const handleChangeColor = (color: any, event: any) => {
    onChange && onChange(color?.hex);
    setColor(color?.hex);
    // color = {
    //   hex: '#333',
    //   rgb: {
    //     r: 51,
    //     g: 51,
    //     b: 51,
    //     a: 1,
    //   },
    //   hsl: {
    //     h: 0,
    //     s: 0,
    //     l: .20,
    //     a: 1,
    //   },
    // }
  };

  const blurHandler = (e: FocusEvent<HTMLInputElement>) => {
    inputProps.onBlur && inputProps.onBlur(e);
  };
  const focusHandler = (e: FocusEvent<HTMLInputElement>) => {
    inputProps.onFocus && inputProps.onFocus(e);
  };

  const handleOpenPicker = () => setOpenPicker(true);
  const handleClosePicker = () => setOpenPicker(false);

  return (
    <ComponentWrapper dimension={dimension} ref={componentRefCallback} onClick={handleOpenPicker}>
      {label && <Label>{label}</Label>}
      <ColoredPalette background={selectedColor} />
      <InputStyled
        id={`input-text-${inputProps.name}-${uniqId}`}
        ref={currentRef}
        type={'hidden'}
        value={selectedColor}
        {...inputProps}
        onBlur={blurHandler}
        onFocus={focusHandler}
      />
      <Popup
        isOpen={isOpenPicker}
        openerElement={componentElement}
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
    </ComponentWrapper>
  );
});
