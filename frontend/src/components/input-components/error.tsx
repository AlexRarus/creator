import React, { ReactNode } from 'react';
import Popup from 'src/components/popup';
import { isMobile } from 'react-device-detect';

import { ErrorStyled } from './style';

interface IProps {
  isOpen: boolean;
  children: ReactNode;
  openerElement: HTMLElement | null;
}

export function Error(props: IProps) {
  const { isOpen, children, openerElement } = props;

  return (
    <Popup
      isOpen={isOpen}
      openerElement={openerElement}
      position={isMobile ? 'top' : 'right'}
      horizontalAlign='center'
      verticalAlign='center'
      zIndex={1000}
      isCloseOnClick={false}
      floatPosition={true}>
      <ErrorStyled>{children}</ErrorStyled>
    </Popup>
  );
}
