import React, { useRef, RefObject, useState, useEffect, useCallback } from 'react';
import Popup from 'src/components/popup';
import { disableScroll, enableScroll } from 'src/utils/scroll';
import CheckIcon from '@mui/icons-material/Check';
import { useThemeContext } from 'src/providers/main-theme-provider';
import { lighten } from 'polished';

import { IProps, IOption } from './interfaces';
import {
  ButtonSelectWrapper,
  ButtonStyled,
  ShivronIconBox,
  ShivronIcon,
  OptionsListOuter,
  OptionsListInner,
  Option,
  OptionChecked,
  OptionIcon,
  OptionLabel,
} from './style';

export type { IOption };
export default function ButtonSelect(props: IProps) {
  const {
    value,
    options,
    onChange,
    dimension = 'l',
    kind = 'formed',
    width,
    menuWidth,
    maxMenuHeight,
    className,
  } = props;
  const [menuIsOpen, setOpenMenu] = useState(false);
  const [openerElement, openerRefCallback] = useState<HTMLElement | null>(null);
  const optionsListRef: RefObject<HTMLDivElement> = useRef(null);
  const activeOptionRef: RefObject<HTMLDivElement> = useRef(null);
  const [componentWidth, setComponentWidth] = useState(menuWidth || 0);
  const valueOption = options.find(
    (option: IOption) => option.value === value || option.value === value?.value
  ) as IOption;
  const { DEVICE_THEME } = useThemeContext();

  const openMenu = () => setOpenMenu(true);
  const closeMenu = () => setOpenMenu(false);
  const toggleOpenMenu = useCallback(
    (e: any) => {
      setOpenMenu(!menuIsOpen);
    },
    [menuIsOpen]
  );
  const changeHandler = (option: IOption) => () => {
    onChange && onChange(option);
    menuIsOpen && closeMenu();
  };

  useEffect(() => {
    if (!menuWidth) {
      const componentWidth: number = openerElement?.getBoundingClientRect()?.width || 0;
      setComponentWidth(componentWidth);
    }
  }, [valueOption, valueOption?.label, menuIsOpen]);

  useEffect(() => {
    if (menuIsOpen) {
      disableScroll();
    } else {
      enableScroll();
    }
  }, [menuIsOpen]);

  return (
    <>
      <ButtonSelectWrapper ref={openerRefCallback} width={width} onClick={toggleOpenMenu}>
        <ButtonStyled
          kind={kind}
          dimension={dimension}
          width={width}
          onClick={openMenu}
          className={className}>
          {valueOption && valueOption.label ? <span>{valueOption.label}</span> : ''}
          <ShivronIconBox isOpen={menuIsOpen}>
            <ShivronIcon />
          </ShivronIconBox>
        </ButtonStyled>
      </ButtonSelectWrapper>
      <Popup
        isOpen={menuIsOpen}
        openerElement={openerElement}
        onClose={closeMenu}
        position='bottom'
        horizontalAlign='start'
        autoAlign={false}
        floatPosition={false}
        hasPointer={false}
        isCloseOnClick={false}
        fitOnScreen={true}
        plateMargin={4}
        maxHeight={maxMenuHeight || 300}
        zIndex={99999999}
        borderColor={lighten(0.06, DEVICE_THEME?.borderColor?.primary)}
        background={lighten(0.02, DEVICE_THEME?.background?.primary)}
        color={DEVICE_THEME?.textColor?.primary}
        isFixed={true}>
        <OptionsListOuter ref={optionsListRef} componentWidth={componentWidth}>
          <OptionsListInner>
            {options &&
              options.map((option: IOption, i) => (
                <Option
                  kind={kind}
                  dimension={dimension}
                  key={`${option.value}-${i}`}
                  isActive={value ? value.value === option.value : false}
                  ref={value && value.value === option.value ? activeOptionRef : null}
                  onClick={changeHandler(option)}>
                  {option?.icon && <OptionIcon>{option.icon}</OptionIcon>}
                  <OptionLabel>{option.label}</OptionLabel>
                  <OptionChecked>
                    {value && value.value === option.value && <CheckIcon fontSize={'small'} />}
                  </OptionChecked>
                </Option>
              ))}
          </OptionsListInner>
        </OptionsListOuter>
      </Popup>
    </>
  );
}
