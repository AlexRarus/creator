import styled from 'styled-components';
import { COLORS } from 'src/components/theme';

import { FORM_HEADER_HEIGHT, FORM_FOOTER_HEIGHT } from './page-form/style';

export const DesktopPageWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 20px;
`;

export const BlockWrapper = styled.div`
  height: 100%;
`;

export const PhoneWrapper = styled.div<{ isForm: boolean }>`
  position: relative;
  width: 400px;
  height: 800px;
  border: 7px solid ${COLORS.black};
  border-radius: 30px;
  overflow: hidden;
  padding-top: ${({ isForm }) => (isForm ? FORM_HEADER_HEIGHT : 0)}px;
  padding-bottom: ${({ isForm }) => (isForm ? FORM_FOOTER_HEIGHT : 0)}px;
`;
