import React, { useState } from 'react';
import { InputText } from 'src/components/input-text';
import Popup from 'src/components/popup';
import Modal from 'src/components/modal';
import { ChromePicker } from 'react-color';
import { isMobile } from 'react-device-detect';
import { Grid, GridColumn } from 'src/components/grid';
import { Form } from 'src/components/form';

import { IProps } from './interfaces';
import { ColorPreviewWrapper, FormWrapper, ColorPickerWrapper, ColorPreview } from './style';

export const ColorPicker = React.forwardRef((props: IProps, ref: any) => {
  const { disableAlpha = false, ...restProps } = props;
  const [isOpenPicker, setOpenPicker] = useState(false);
  const [innerValue, setInnerValue] = useState(props.value);
  const [colorPreviewElement, colorPreviewRefCallback] = useState<HTMLDivElement | null>(null);

  const handleChange = (value: string) => {
    props.onChange && props.onChange(value);
  };
  const handleOpenPicker = () => setOpenPicker(true);
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
        handleClosePicker();
        break;
      default:
        break;
    }
  };

  return (
    <>
      <InputText ref={ref} maxLength={100} {...restProps} onChange={handleChange} color={'#000000'}>
        <ColorPreviewWrapper>
          <ColorPreview
            onClick={handleOpenPicker}
            ref={colorPreviewRefCallback}
            background={props.value}
            hasBorder={true}
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
          <Grid>
            <GridColumn>
              <ColorPickerWrapper>
                <ChromePicker
                  color={innerValue}
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
          <FormWrapper>
            <Form onAction={onAction} submitActionLabel='Готово'>
              <Grid>
                <GridColumn>
                  <ColorPickerWrapper>
                    <ChromePicker
                      color={innerValue}
                      onChange={handleInnerChangeColor}
                      onChangeComplete={handleChangeColor}
                      disableAlpha={disableAlpha}
                    />
                  </ColorPickerWrapper>
                </GridColumn>
              </Grid>
            </Form>
          </FormWrapper>
        </Modal>
      )}
    </>
  );
});
