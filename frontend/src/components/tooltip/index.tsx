import React, { useEffect, useState } from 'react';
import { COLORS } from 'src/components/theme';
import Popup from 'src/components/popup';

import { IProps } from './interfaces';
import { TooltipContent } from './style';

// отдельный (черный) тултип который можно отрендерить на любом элементе передав ему refOpener
export function Tooltip(props: IProps) {
  const { openerElement, children, position = 'bottom' } = props;
  const [isHoverInformer, setIsHoverInformer] = useState(false);

  const openHandler = () => setIsHoverInformer(true);
  const closeHandler = () => setIsHoverInformer(false);

  useEffect(() => {
    if (openerElement) {
      openerElement.addEventListener('mouseenter', openHandler);
      openerElement.addEventListener('mouseleave', closeHandler);
    }

    return () => {
      if (openerElement) {
        openerElement.removeEventListener('mouseenter', openHandler);
        openerElement.removeEventListener('mouseleave', closeHandler);
      }
    };
  }, [openerElement]);

  return (
    <Popup
      isOpen={isHoverInformer}
      onClose={closeHandler}
      openerElement={openerElement}
      horizontalAlign='center'
      verticalAlign='center'
      position={position}
      maxHeight={320}
      pointerSize={6}
      plateMargin={6}
      color={COLORS.white}
      background={COLORS.black}
      floatPosition={true}>
      <TooltipContent>{children}</TooltipContent>
    </Popup>
  );
}
