import styled from 'styled-components';
import { MEDIA } from 'src/components/theme';
import Link from 'src/components/link';

export const FooterWrapper = styled.div`
  display: flex;
  flex-direction: ${({ theme }) => (theme?.isMobile ? 'column' : 'row')};
  width: 100%;
  padding: ${({ theme }) => (theme?.isMobile ? '4px' : '15px 30px')};
  justify-content: space-between;
  height: 64px;
`;

export const LeftSide = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const RightSide = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

export const LinkStyled = styled(Link)`
  margin-right: 10px;
`;
