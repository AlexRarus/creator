import React, { useRef, RefObject } from 'react';
import { TargetBlockTypePreview } from 'src/containers/app/block';

import { ToggleButton, ToggleWrapper } from './style';
import { getDefaultBlock } from './utils';

interface IProps {
  list: string[];
  value?: string;
  onChange?: (selectedValue: string) => void;
  iconRefCallback?: any;
  isWide?: boolean;
  isTransparent?: boolean;
  icon?: any;
}

export const Toggle = ({
  list,
  value,
  onChange,
  iconRefCallback,
  isWide,
  isTransparent,
  icon,
}: IProps) => {
  const buttonRef: RefObject<HTMLDivElement> = useRef(null);

  const handleChange = (selected: string) => () => {
    onChange && onChange(selected);
  };

  return (
    <ToggleWrapper>
      {list.map((item) => (
        <ToggleButton
          ref={item === 'icon' ? iconRefCallback : buttonRef}
          onClick={handleChange(item)}
          isSelected={value === item}
          key={item}>
          <TargetBlockTypePreview
            block={getDefaultBlock(item, isWide, isTransparent, icon) as any}
          />
        </ToggleButton>
      ))}
    </ToggleWrapper>
  );
};
