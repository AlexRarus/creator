import styled from 'styled-components';
import { ITheme } from 'src/dal/themes/interface';

interface PreviewProps {
  selectedTheme: ITheme | null;
}

export const AvatarFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-grow: 1;
`;

export const PreviewWrapper = styled.div<PreviewProps>`
  padding: 20px;
  min-height: 120px;
  width: 100%;
  background: ${({ selectedTheme }) => selectedTheme?.background || 'inherit'};
  color: ${({ selectedTheme }) => selectedTheme?.color || 'inherit'};
`;
