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
  padding-top: ${({ paddingTop }) => paddingTop || 20}px;
  padding-bottom: ${({ paddingBottom }) => paddingBottom || 20}px;
  padding-right: ${({ paddingRight }) => paddingRight || 14}px;
  padding-left: ${({ paddingLeft }) => paddingLeft || 12}px;
  border-radius: ${({ borderRadius }) => borderRadius || 0}px;
  background: ${({ background }) => {
    console.log(background);
    return background || 'inherit';
  }};
  ${({ backgroundUrl }) =>
    backgroundUrl
      ? css`
          background-image: url(${backgroundUrl});
          background-repeat: no-repeat;
          background-size: contain;
        `
      : ''}
`;
