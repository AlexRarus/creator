import styled from 'styled-components';

export const Mark = styled.div<{ position: number; isHide: boolean }>`
  position: absolute;
  left: ${({ position }) => `${position * 100}%`};
  bottom: 0;
  font-size: 13px;
  opacity: ${({ isHide }) => (isHide ? 0 : 1)};
  transition: opacity 200ms ease-out;
`;

export const InputRangeWrapper = styled.label`
  position: relative;
  display: flex;
  flex-direction: column;
  padding-bottom: 14px;
  width: 100%;
`;

export const InnerLabel = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  line-height: 16px;
`;
