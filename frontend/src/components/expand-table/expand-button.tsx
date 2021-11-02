import React, { useCallback } from 'react';

import { ExpandButtonWrapper, ExpandButton } from './style';

interface IExpandButtonProps {
  onClick?(): void;
  isExpand?: boolean;
  isHeader?: boolean;
}

export default function ExpandButtonComponent(props: IExpandButtonProps) {
  const { onClick, isExpand = false, isHeader = false } = props;

  const handleClick = useCallback(() => {
    onClick && onClick();
  }, [onClick]);

  return (
    <ExpandButtonWrapper isHeader={isHeader} onClick={handleClick}>
      <ExpandButton isExpand={isExpand} />
    </ExpandButtonWrapper>
  );
}
