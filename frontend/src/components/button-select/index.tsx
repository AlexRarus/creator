import React, { useRef, RefObject, useState, useEffect, useCallback } from 'react';
import Popup from 'src/components/popup';
import { disableScroll, enableScroll } from 'src/utils/scroll';

import { IProps, IOption } from './interfaces';
import {
  ButtonSelectWrapper,
  ButtonStyled,
  ShivronIcon,
  OptionsListOuter,
  OptionsListInner,
  Option,
} from './style';

export type { IOption };
export default function ButtonSelect(props: IProps) {
  const {
    value,
    options,
    onChange,
    dimension = 'l',
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
  }, [value && value.label, menuIsOpen]);

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
        <ButtonStyled dimension={dimension} width={width} onClick={openMenu} className={className}>
          {value && value.label ? <span>{value.label}</span> : ''}
          <ShivronIcon />
        </ButtonStyled>
      </ButtonSelectWrapper>
      <Popup
        isOpen={menuIsOpen}
        openerElement={openerElement}
        onClose={closeMenu}
        position='bottom'
        horizontalAlign='start'
        autoAlign={false}
        floatPosition={true}
        hasPointer={false}
        isCloseOnClick={false}
        plateMargin={4}
        maxHeight={maxMenuHeight || 300}
        isFixed={true}
      >
        <OptionsListOuter ref={optionsListRef} componentWidth={componentWidth}>
          <OptionsListInner>
            {options &&
              options.map((option: IOption, i) => (
                <Option
                  key={`${option.value}-${i}`}
                  isActive={value ? value.value === option.value : false}
                  ref={value && value.value === option.value ? activeOptionRef : null}
                  onClick={changeHandler(option)}
                >
                  {option.label}
                </Option>
              ))}
          </OptionsListInner>
        </OptionsListOuter>
      </Popup>
    </>
  );
}
