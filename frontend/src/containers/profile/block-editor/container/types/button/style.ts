import styled from 'styled-components';
import ButtonSelect from 'src/components/button-select';
// import { ITheme } from 'src/dal/themes/interface';

export const SectionFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-grow: 1;
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
