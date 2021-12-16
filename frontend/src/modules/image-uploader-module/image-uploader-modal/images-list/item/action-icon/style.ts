import styled from 'styled-components';
import { COLORS } from 'src/components/theme';

const IconColors = {
  primary: COLORS.blue[500],
  secondary: COLORS.black,
  delete: COLORS.red[500],
};

export const IconWrapper = styled.div<{ kind?: string }>`
  color: ${({ kind = 'primary' }) => IconColors[kind]};
`;
