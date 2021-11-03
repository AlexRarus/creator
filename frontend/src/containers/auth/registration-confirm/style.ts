import styled from 'styled-components';
import Link from 'src/components/link';
import { COLORS } from 'src/components/theme';

export const AuthMessageWrapper = styled.div`
  max-width: 800px;
  margin-top: 100px;
`;
export const Message = styled.div`
  font-size: 16px;
`;

export const MenuLink = styled(Link)`
  display: inline-flex;
  flex-direction: row;

  :after {
    display: block;
    content: '\u2219';
    margin: 0 8px;
    color: ${COLORS.black};
  }

  :last-child {
    :after {
      display: none;
      color: ${COLORS.black};
    }
  }
`;
