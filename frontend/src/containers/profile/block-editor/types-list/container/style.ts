import styled from 'styled-components';

export const BlocksTypesContainerWrapper = styled.div`
  padding: 20px;
  display: grid;
  grid-gap: ${({ theme }) => (theme?.isMobile ? 10 : 16)}px;
  grid-template-columns: repeat(${({ theme }) => (theme?.isMobile ? 3 : 4)}, 100px);
  margin: 0 auto;
`;

export const TypeItemStyled = styled.div<{ background?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  cursor: pointer;
  border-radius: 16px;
  background: ${({ background }) => background || 'transparent'};
`;

export const TypeLabel = styled.div`
  margin-top: 4px;
  font-size: 16px;
`;
