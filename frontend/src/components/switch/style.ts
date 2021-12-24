import styled from 'styled-components';

export const SwitchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 49px;
`;

export const SwitchLabel = styled.div`
  font-size: 13px;
  height: 13px;
  color: ${({ theme }) => theme.textColor.secondary};
  transition: all 300ms;
`;
