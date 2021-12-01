import styled from 'styled-components';
import { COLORS, MEDIA } from 'src/components/theme';

export const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
`;

export const ChangeButton = styled.div`
  font-size: 14px;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  user-select: none;
  color: ${COLORS.grey[500]};
  transition: all 200ms ease-out;
  margin-top: 5px;

  :hover {
    color: ${COLORS.orange[500]};
  }

  ${MEDIA.max768({
    fontSize: '16px',
  })}
`;
