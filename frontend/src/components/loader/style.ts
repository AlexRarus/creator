import styled from 'styled-components';

export const LoaderWrapper = styled.div<{ size: number }>`
  position: absolute;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;
