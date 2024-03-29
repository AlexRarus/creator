import React, { useState } from 'react';
import InputText from 'src/components/input-text';

import { IProps } from './interfaces';
import { useMask } from './hooks';

export const InputMask = React.forwardRef((props: IProps, ref: any) => {
  const [inputType] = useState('text');
  const { mask } = props;

  // useEffect(() => {
  //   if (mask === 'phone' || mask === 'sms') {
  //     setType('number');
  //   } else {
  //     setType('text');
  //   }
  // }, [mask]);

  const onMaskedChange = useMask(mask, props.onChange);
  return <InputText {...props} onChange={onMaskedChange} type={inputType} />;
});
