import styled from 'styled-components';

export const VisibleIconWrapper = styled.div`
  cursor: pointer;
  height: 100%:
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    fill: ${({ theme }) => theme?.textColor.primary};
  }
`;
