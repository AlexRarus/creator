import styled from 'styled-components';
import { COLORS } from 'src/components/theme';

export const PageFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
`;

export const BlockWrapper = styled.div`
  height: 100%;
  width: 100%;
  border: 2px solid ${COLORS.red[700]};
`;

export const PhoneWrapper = styled.div`
  width: 400px;
  height: 800px;
  border: 7px solid ${COLORS.black};
  border-radius: 30px;
  padding: 24px;
`;
