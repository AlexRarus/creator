import styled from 'styled-components';
import { MEDIA, COLORS } from 'src/components/theme';

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 15px 30px;
  background: ${COLORS.blue[600]};
  color: ${COLORS.white};
  justify-content: space-between;
  height: 64px;
  ${MEDIA.max1024({
    width: '100%',
  })}
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
