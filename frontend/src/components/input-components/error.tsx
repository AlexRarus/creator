import React, { ReactNode } from 'react';
import Popup from 'src/components/popup';

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
      position='right'
      verticalAlign='center'
      zIndex={99}
      isCloseOnClick={false}
      floatPosition={true}>
      <ErrorStyled>{children}</ErrorStyled>
    </Popup>
  );
}
