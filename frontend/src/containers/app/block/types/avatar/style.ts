import styled from 'styled-components';
import { ITheme } from 'src/dal/themes/interface';

interface IPreviewProps {
  selectedTheme: ITheme | null;
}

export const AvatarBlockWrapper = styled.div<IPreviewProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  color: ${({ selectedTheme }) => selectedTheme?.color || 'inherit'};
  width: 100%;
`;
