import styled from 'styled-components';
import { MEDIA, COLORS, defaultTheme } from 'src/components/theme';
import Link from 'src/components/link';

export const FooterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 15px 30px;
  color: ${COLORS.black};
  justify-content: space-between;
  height: 64px;
  ${MEDIA.max1024({
    width: '100%',
  })}
`;
FooterWrapper.defaultProps = {
  theme: defaultTheme,
};

export const LeftSide = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
LeftSide.defaultProps = {
  theme: defaultTheme,
};
export const RightSide = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;
RightSide.defaultProps = {
  theme: defaultTheme,
};

export const LinkStyled = styled(Link)`
  margin-right: 10px;
`;
