import styled from 'styled-components';
import { rgba } from 'polished';
// import { COLORS } from 'src/components/theme';
import { MobileView } from 'react-device-detect';

import { FORM_HEADER_HEIGHT, FORM_FOOTER_HEIGHT } from './page-form/style';

export const DesktopPageWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 24px;
  margin-top: 24px;
`;

export const BlockWrapper = styled.div`
  height: 100%;
`;

export const ScaleBlock = styled.div`
  height: 100%;
  transform: scale(0.9);
`;

export const EditorWrapper = styled.div<{ isForm: boolean }>`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  margin-left: 32px;
  height: 800px;

  box-shadow: 0px 0px 10px ${({ theme }) => rgba(theme?.borderColor?.contrast, 0.1)};

  overflow: hidden;
  padding-top: ${({ isForm }) => (isForm ? FORM_HEADER_HEIGHT : 0)}px;
  padding-bottom: ${({ isForm }) => (isForm ? FORM_FOOTER_HEIGHT : 0)}px;
`;

export const StyledMobileView = styled(MobileView)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const FlexBlock = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;
