import React from 'react';

import { IAction } from '../index';

import { IconWrapper } from './style';

interface IProps {
  action: IAction;
}

export const ActionIcon = (props: IProps) => {
  const {
    action: { kind, Icon },
  } = props;

  return <IconWrapper kind={kind}>{Icon && <Icon />}</IconWrapper>;
};
