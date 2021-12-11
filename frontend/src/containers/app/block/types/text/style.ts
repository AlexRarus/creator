import styled from 'styled-components';
import { ITheme } from 'src/dal/themes/interface';

interface IBlockPreviewProps {
  selectedTheme: ITheme | null;
}

export const TextBlockStyled = styled.div<IBlockPreviewProps>`
  position: relative;
  color: ${({ selectedTheme }) => selectedTheme?.color || 'inherit'};
  width: 100%;
`;
