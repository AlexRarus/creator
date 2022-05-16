import React, { forwardRef, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Grid, GridColumn } from 'src/components/grid';
import { QRCodeCanvas } from 'qrcode.react';
import { COLORS } from 'src/components/theme';

import { CanvasWrapperOuter, CanvasWrapperInner } from './style';

interface IProps {
  isOpen: boolean;
}

export const QRCodeFields = forwardRef((props: IProps, ref: any) => {
  const { isOpen } = props;
  const { watch } = useFormContext();
  const [size, setSize] = useState(128);
  const isIndex = watch('isIndex');
  const username = watch('username');
  const slug = watch('slug');
  const link = `${window.location.origin}/${username}${isIndex ? '' : `/${slug}`}`;
  const [canvasWrapperElement, canvasWrapperRefCallback] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSize(canvasWrapperElement?.getBoundingClientRect().width as number);
    }
  }, [canvasWrapperElement, isOpen]);

  return (
    <Grid verticalGap={24}>
      <GridColumn>
        <CanvasWrapperOuter ref={ref} isShow={Boolean(size)}>
          <CanvasWrapperInner ref={canvasWrapperRefCallback}>
            <QRCodeCanvas
              bgColor={COLORS.white}
              fgColor={COLORS.black}
              value={link}
              size={size}
              level='L'
              includeMargin={true}
              imageSettings={{
                src: '/favicon-background.png',
                height: 64,
                width: 64,
                excavate: false,
              }}
            />
          </CanvasWrapperInner>
        </CanvasWrapperOuter>
      </GridColumn>
    </Grid>
  );
});
