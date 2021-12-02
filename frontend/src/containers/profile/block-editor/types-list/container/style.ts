import styled from 'styled-components';
import { rgba } from 'polished';

export const BlocksTypesContainerWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const TypeItemStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 4px;
  box-shadow: 0px 0px 10px ${({ theme }) => rgba(theme?.borderColor?.contrast, 0.1)};
`;

export const TypeLabel = styled.div`
  margin-top: 4px;
  font-size: 16px;
`;
