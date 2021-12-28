import styled, { createGlobalStyle, css } from 'styled-components';
import { MEDIA, FONTS } from 'src/components/theme';

export const GlobalStyleApp = createGlobalStyle<any>`  
  html {
    background: ${({ theme }) => theme.background?.primary};
    color: ${({ theme }) => theme.textColor?.primary};
    width: 100%;
    height: 100%;
    display: table;
    overflow-x: hidden;
    
    &.disable-scroll {
      height: 100vh;
    }
    
    ${({ theme }: any) =>
      theme?.isMobile
        ? css`
            position: relative;
            max-width: 100%;
            overflow-x: hidden;
            text-rendering: optimizeLegibility;
          `
        : css``}
  }    
  
  body {
    ${FONTS.InterStyle};
    margin: 0;
    padding: 0;   
    font-size: 14px;
    background: ${({ theme }) => theme.background?.primary};
    color: ${({ theme }) => theme.textColor?.primary};
    width: 100%;
    overflow-x: hidden;
    
    ${({ theme }) =>
      theme?.isMobile
        ? css`
            position: relative;
            max-width: 100%;
            overflow-x: hidden;
            text-rendering: optimizeLegibility;
          `
        : css``}
    
    &.disable-scroll {
      overflow: hidden;
      position: fixed;
    }

    & .modal-component-wrapper {
      display: none;
      
      :last-of-type {
        display: block;
      }
    }
  }
  
  html,
  body {
    margin: 0;
    padding: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    ${FONTS.InterBoldStyle};
    margin: 0;
  }
  
  video {
    width: 100%;
  }

  #root {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }     
  
  #ModalContainer {
    position: absolute;
    z-index: 100;
  }

  * {
    box-sizing: border-box;
  }
`;

interface IViewProps {
  direction?: 'column' | 'row';
}

export const MobileView = styled.div<IViewProps>`
  flex-direction: ${({ direction = 'row' }: IViewProps) => direction};
  width: 100%;
  height: 100%;

  display: none;
  ${MEDIA.max768({
    display: 'flex',
  })};
`;

export const DesktopView = styled.div<IViewProps>`
  flex-direction: ${({ direction = 'row' }: IViewProps) => direction};
  width: 100%;
  height: 100%;

  display: flex;
  ${MEDIA.max768({
    display: 'none',
  })};
`;
