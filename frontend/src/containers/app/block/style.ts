import styled from 'styled-components';

export const BlockWrapper = styled.div<{ isFake?: boolean }>`
  position: relative;
  :before {
    display: ${({ isFake }) => (isFake ? 'block' : 'none')};
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    width: 100%;
    height: 100%;
    z-index: 10;
  }
`;
