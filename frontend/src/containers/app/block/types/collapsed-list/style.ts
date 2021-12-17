import styled from 'styled-components';

export const CollapsedListBlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const CollapsedListItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  font-size: 16px;
`;

export const CollapsedTrigger = styled.div<{ isExpand: boolean }>`
  svg {
    cursor: pointer;
    font-size: 30px;
    transition: all 100ms ease-out;
    transform: rotate(${({ isExpand }) => (isExpand ? 45 : 0)}deg);
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  font-size: 16px;
  padding: 5px 0 0 5px;
`;

export const CollapsedListItemTitle = styled.div`
  font-weight: bold;
`;

export const CollapsedListItemDescription = styled.div`
  font-weight: normal;
  white-space: pre-line;
`;
