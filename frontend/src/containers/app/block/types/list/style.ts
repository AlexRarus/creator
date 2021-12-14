import styled, { css } from 'styled-components';
import { COLORS } from 'src/components/theme';

export interface IListItemProps {
  iconSize?: number;
  template?: string;
  fontSize?: string;
}

export interface IListItemIconProps {
  iconSize?: string;
}

export const ListBlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const getGridTemplateAreas = (props: IListItemProps) => {
  const { template, iconSize = 0 } = props;
  switch (template) {
    case 'left':
      return css`
        grid-template: 'icon content' auto / ${iconSize + 20}px 1fr;
      `;
    case 'top':
      return css`
        grid-template:
          'icon'
          'content' auto / 1fr;
      `;
    case 'right':
      return css`
        grid-template: 'content icon' auto / 1fr ${iconSize + 20}px;
      `;
    default:
      return css`
        grid-template: 'icon content' auto / ${iconSize + 20}px 1fr;
      `;
  }
};
export const getFontSize = (props: IListItemProps) => {
  switch (props.fontSize) {
    case 's':
      return '14px';
    case 'm':
      return '16px';
    case 'l':
      return '18px';
    default:
      return '16px';
  }
};

export const ListItemWrapper = styled.div<IListItemProps>`
  display: grid;
  width: 100%;
  ${getGridTemplateAreas};
  font-size: ${getFontSize};
  padding: 10px 0;
`;

export const ListItemIconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ListItemIconShape = styled.div<IListItemIconProps>`
  grid-area: icon;
  width: ${({ iconSize }) => iconSize}px;
  height: ${({ iconSize }) => iconSize}px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 1px solid ${COLORS.grey[400]};
  overflow: hidden;
`;

export const IconElement = styled.img<{ isLoaded: boolean }>`
  transition: all 200ms ease-out;
  opacity: ${({ isLoaded }) => (isLoaded ? 1 : 0)};
  max-width: 100%;
  max-height: 100%;
`;

export const ListItemContent = styled.div`
  grid-area: content;
  display: flex;
  flex-direction: column;
`;

export const ListItemTitle = styled.div`
  font-weight: bold;
`;

export const ListItemDescription = styled.div`
  font-weight: normal;
`;
