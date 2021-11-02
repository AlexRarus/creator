import styled from 'styled-components';
import { COLORS } from 'src/components/theme';

export const LocaleWrapper = styled.div``;

export const LanguageLabel = styled.div`
  padding: 4px 16px;
  cursor: pointer;
`;

export const LanguagesList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LanguageOption = styled.div`
  padding: 4px 16px;
  cursor: pointer;
  transition: all 300ms;
  background: ${COLORS.white};

  :hover {
    background: ${COLORS.grey[300]};
  }
`;
