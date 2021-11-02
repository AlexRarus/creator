import React, { useState } from 'react';
import { Tooltip } from 'src/components/tooltip';

import { IProps } from './interfaces';
import { InformerWrapper, HelpOutlineIconStyled } from './style';

// тултип вместе с иконкой вопроса относительно которой он рендерится
export function Informer(props: IProps) {
  const { children, position = 'bottom' } = props;
  const [openerElement, openerRefCallback] = useState<HTMLElement | null>(null);

  return (
    <InformerWrapper ref={openerRefCallback}>
      <HelpOutlineIconStyled />
      <Tooltip openerElement={openerElement} position={position}>
        {children}
      </Tooltip>
    </InformerWrapper>
  );
}
