import styled from 'styled-components';
import { COLORS } from 'src/components/theme';

export const VisibleIconWrapper = styled.div`
  cursor: pointer;

  svg {
    fill: ${COLORS.grey[400]};
  }
`;
