import styled from 'styled-components';
import ButtonSelect from 'src/components/button-select';
import { COLORS } from 'src/components/theme';

export const ButtonFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  flex-grow: 1;
  background: ${COLORS.white};
`;

export const Label = styled.div`
  font-size: 14px;
  margin-bottom: 4px;
`;

export const FakeLabel = styled.div`
  margin-bottom: auto;
`;

export const Button = styled.button`
  width: 100%;
  padding: 16px;
  height: 48px;
`;

export const ButtonSelectStyled = styled(ButtonSelect)``;

export const KindsList = styled.div`
  padding: 20px;
`;

export const KindWrapper = styled.div`
  width: 100%;
`;

export const RefTemplateButton = styled.div`
  width: 100%;
`;
