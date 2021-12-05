import styled from 'styled-components';
import { ITheme } from 'src/dal/themes/interface';

export const TextBlockStyled = styled.div<{
  selectedTheme: ITheme | null;
}>`
  position: relative;
  color: ${({ selectedTheme }) => selectedTheme?.color || 'inherit'};
  width: 100%;
`;
