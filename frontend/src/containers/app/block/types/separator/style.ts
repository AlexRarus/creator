import styled from 'styled-components';

import { IListItemIconProps } from '../list/style';

export const SeparatorBlock = styled.div<{
  isWide?: boolean;
  isTransparent?: boolean;
  isEmpty?: boolean;
  value?: number;
}>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: ${({ value }) => value}px 0px;
  opacity: ${({ isEmpty }) => (isEmpty ? 0 : 1)};

  :before {
    content: '';
    width: ${({ isWide }) => `calc(${isWide ? 50 : 25}%)`};
    height: 2px;
    border-radius: 1px 0 0 1px;
    background: ${({ theme, isTransparent }) =>
      isTransparent
        ? `linear-gradient(to right, transparent, ${theme?.textColor?.primary});`
        : theme?.textColor?.primary};
  }

  :after {
    content: '';
    width: ${({ isWide }) => `calc(${isWide ? 50 : 25}%)`};
    height: 2px;
    border-radius: 0px 1px 1px 0px;
    background: ${({ theme, isTransparent }) =>
      isTransparent
        ? `linear-gradient(to right, ${theme?.textColor?.primary}, transparent);`
        : theme?.textColor?.primary};
  }
`;

export const IconBlock = styled.div<IListItemIconProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 24px;
`;

export const IconElement = styled.img`
  max-width: 100%;
  max-height: 100%;
`;
