import styled from 'styled-components';
import { ISectionData } from 'src/dal/blocks/section-interfaces';
import { getSectionStyle } from 'src/dal/blocks/style';

export const SectionBlock = styled.div<ISectionData>`
  width: 100%;
  padding-top: ${({ paddingTop }) => paddingTop}px;
  padding-bottom: ${({ paddingBottom }) => paddingBottom}px;
  padding-right: ${({ paddingRight }) => paddingRight}px;
  padding-left: ${({ paddingLeft }) => paddingLeft}px;
  border-radius: ${({ borderRadius }) => borderRadius}px;
  ${getSectionStyle};
`;
