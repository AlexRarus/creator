import React, { useState, useEffect, SyntheticEvent } from 'react';
import { InputText } from 'src/components/input-text';
import Popup from 'src/components/popup';
import Modal from 'src/components/modal';
import { ChromePicker } from 'react-color';
import { isMobile } from 'react-device-detect';
import { Grid, GridColumn } from 'src/components/grid';
import { Form } from 'src/components/form';
import Color from 'color';

import { IProps } from './interfaces';
import {
  ColorPreviewWrapper,
  FormWrapper,
  ColorPickerWrapper,
  ColorPreview,
  ClickableWrapper,
} from './style';

export const ColorPicker = React.forwardRef((props: IProps, ref: any) => {
  const { disableAlpha = false, ...restProps } = props;
  const [isOpenPicker, setOpenPicker] = useState(false);
  const [innerValue, setInnerValue] = useState<string>(props.value);
  const [colorName, setColorName] = useState<string>('');
  const [colorPreviewElement, colorPreviewRefCallback] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (innerValue) {
      const colorObj = Color(innerValue);
      const colorName = colorObj?.keyword() || '';
      setColorName(colorName);
    }
  }, [innerValue]);

  useEffect(() => {
    // при открытии-закрытии палитры синхронизируем значение цвета
    setInnerValue(props.value);
  }, [isOpenPicker]);

  const handleChange = (value: string) => {
    props.onChange && props.onChange(value);
  };
  const handleOpenPicker = (event: any) => {
    event?.preventDefault();
    event?.stopPropagation();
    setOpenPicker(true);
  };
  const handleClosePicker = () => {
    setOpenPicker(false);
  };

  const handleInnerChangeColor = (color: any) => {
    const { r, g, b, a } = color.rgb;
    setInnerValue(`rgba(${r}, ${g}, ${b}, ${a})`);
  };

  const handleChangeColor = (color: any) => {
    const { r, g, b, a } = color.rgb;
    handleChange(`rgba(${r}, ${g}, ${b}, ${a})`);
  };

  const onAction = (actionId: string) => {
    switch (actionId) {
      case 'submit':
        handleChange(innerValue);
        handleClosePicker();
        break;
      case 'cancel':
        handleClosePicker();
        break;
      default:
        break;
    }
  };

  const stopPropagation = (e: SyntheticEvent) => {
    e.stopPropagation();
    e.nativeEvent.stopPropagation();
  };

  return (
    <ClickableWrapper onClick={handleOpenPicker}>
      <InputText ref={ref} maxLength={100} disabled={true} {...restProps} value={colorName}>
        <ColorPreviewWrapper>
          <ColorPreview ref={colorPreviewRefCallback} background={props.value} hasBorder={true} />
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
          <Grid>
            <GridColumn>
              <ColorPickerWrapper>
                <ChromePicker
                  color={innerValue || undefined}
                  onChange={handleInnerChangeColor}
                  onChangeComplete={handleChangeColor}
                  disableAlpha={disableAlpha}
                />
              </ColorPickerWrapper>
            </GridColumn>
          </Grid>
        </Popup>
      )}
      {isMobile && isOpenPicker && (
        <Modal title='Выбор цвета' onClose={handleClosePicker}>
          <FormWrapper onClick={stopPropagation}>
            <Form onAction={onAction} submitActionLabel='Готово'>
              <Grid>
                <GridColumn>
                  <ColorPickerWrapper>
                    <ChromePicker
                      color={innerValue || undefined}
                      onChange={handleInnerChangeColor}
                      onChangeComplete={handleInnerChangeColor}
                      disableAlpha={disableAlpha}
                    />
                  </ColorPickerWrapper>
                </GridColumn>
              </Grid>
            </Form>
          </FormWrapper>
        </Modal>
      )}
    </ClickableWrapper>
  );
});
