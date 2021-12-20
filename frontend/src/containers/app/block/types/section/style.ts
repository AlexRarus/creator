import styled, { css } from 'styled-components';

interface ISection {
  background?: string;
  backgroundUrl?: string;
  borderRadius?: string;
  paddingTop?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  paddingRight?: string;
  [key: string]: any;
}

export const SectionBlock = styled.div<ISection>`
  width: 100%;
  padding-top: ${({ paddingTop }) => paddingTop}px;
  padding-bottom: ${({ paddingBottom }) => paddingBottom}px;
  padding-right: ${({ paddingRight }) => paddingRight}px;
  padding-left: ${({ paddingLeft }) => paddingLeft}px;
  border-radius: ${({ borderRadius }) => borderRadius}px;
  background: ${({ background }) => background || 'inherit'};
  background-repeat: no-repeat;
  background-size: cover;
`;
