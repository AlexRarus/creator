import React from 'react';
import InputText from 'src/components/input-text';

import { IProps } from './interfaces';
import { useMask } from './hooks';

export const InputMask = React.forwardRef((props: IProps, ref: any) => {
  const { mask } = props;
  const onMaskedChange = useMask(mask, props.onChange);
  return <InputText {...props} onChange={onMaskedChange} />;
});
