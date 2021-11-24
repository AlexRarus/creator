import { createGlobalStyle, css } from 'styled-components';
import { COLORS, FONTS, ITheme } from 'src/components/theme';

export const GlobalStyleApp = createGlobalStyle`  
  html {
    background-color: ${COLORS.grey[50]};
    width: 100%;
    height: 100%;
    display: table;
    
    ${({ theme }: { theme: ITheme }) =>
      theme?.isMobile
        ? css`
            position: relative;
            max-width: 100%;
            overflow-x: hidden;
            overflow-y: scroll;
            text-rendering: optimizeLegibility;
          `
        : css``}
  }    
  
  body {
    ${FONTS.InterStyle};
    margin: 0;
    padding: 0;   
    font-size: 14px;
    color: ${COLORS.grey[900]};   
    width: 100%;
    display: table-cell;
    
    ${({ theme }: { theme: ITheme }) =>
      theme?.isMobile
        ? css`
            position: relative;
            max-width: 100%;
            overflow-x: hidden;
            overflow-y: scroll;
            text-rendering: optimizeLegibility;
          `
        : css``}
    
    &.disable-scroll {
      overflow: hidden;
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
