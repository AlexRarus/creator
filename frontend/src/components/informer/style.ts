import styled from 'styled-components';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { COLORS } from 'src/components/theme';

export const HelpOutlineIconStyled = styled(HelpOutlineIcon)`
  color: ${COLORS.grey[400]};
`;

export const InformerWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  ${HelpOutlineIconStyled} {
    font-size: 20px;
  }
`;
