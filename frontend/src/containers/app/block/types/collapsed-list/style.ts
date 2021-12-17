import styled from 'styled-components';

export const CollapsedListBlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const CollapsedListItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 16px;
`;

export const TitleWrapper = styled.div<{ isExpand: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 16px;
  width: 100%;
  cursor: pointer;

  svg {
    cursor: pointer;
    font-size: 30px;
    transition: all 100ms ease-out;
    transform: rotate(${({ isExpand }) => (isExpand ? 45 : 0)}deg);
  }
`;

export const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  width: 100%;
  padding-left: 30px;
`;

export const CollapsedListItemTitle = styled.div`
  font-weight: bold;
`;

export const CollapsedListItemDescription = styled.div`
  font-weight: normal;
  white-space: pre-line;
`;
