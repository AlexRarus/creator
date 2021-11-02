import React from 'react';
import Checkbox from 'src/components/checkbox';

import { CheckboxWrapper } from './style';

interface ICheckboxProps {
  checked: boolean;
  onChange(checked: boolean): void;
  isHeader?: boolean;
}

export default function CheckboxComponent(props: ICheckboxProps) {
  const { checked, onChange, isHeader } = props;
  const onCheck = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    onChange(!checked);
  };

  return (
    <CheckboxWrapper isHeader={isHeader}>
      <Checkbox checked={checked} size={'small'} onChange={onCheck} />
    </CheckboxWrapper>
  );
}
