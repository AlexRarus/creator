import styled from 'styled-components';

export const SwitchWrapper = styled.div<{ justify: 'flex-start' | 'flex-end' | 'space-between' }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${({ justify }) => justify};
  width: 100%;
  height: 49px;
`;

export const SwitchLabel = styled.div`
  font-size: 14px;
  height: 16px;
  line-height: 16px;
  color: ${({ theme }) => theme.textColor.secondary};
  transition: all 300ms;
`;
