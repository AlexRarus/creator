import styled from 'styled-components';

export const BlinkMessageWrapper = styled.div<{ isShow: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  opacity: ${({ isShow }) => (isShow ? 1 : 0)};
  transition: all 200ms ease-out;
`;
