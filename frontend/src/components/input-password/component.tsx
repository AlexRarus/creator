import React, { useState } from 'react';
import InputText from 'src/components/input-text';
import { IProps as IInputTextProps } from 'src/components/input-text/interfaces';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

import { VisibleIconWrapper } from './style';

type IProps = Omit<IInputTextProps, 'type' | 'icon'>;

interface IconProps {
  visible: boolean;
  onClick(): any;
}

const VisibleIcon = (props: IconProps) => {
  const { visible, onClick } = props;

  return (
    <VisibleIconWrapper onClick={onClick}>
      {visible ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
    </VisibleIconWrapper>
  );
};

export const InputPassword = React.forwardRef((props: IProps, ref: any) => {
  const [visible, setVisible] = useState(false);
  const toggleVisible = () => setVisible(!visible);

  return (
    <InputText
      ref={ref}
      {...props}
      type={visible ? 'text' : 'password'}
      icon={() => <VisibleIcon visible={visible} onClick={toggleVisible} />}
    />
  );
});
