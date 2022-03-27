import styled, { createGlobalStyle, css } from 'styled-components';
import { rgba } from 'polished';
import { MEDIA } from 'src/components/theme';

export const GlobalStyleApp = createGlobalStyle<any>`  
  html {
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    background-color: ${({ theme }) => theme?.mainBackground};
    background-image: ${({ theme }) => theme?.mainGradient};
    color: ${({ theme }) => theme.textColor?.primary};
    
    ${({ theme, appType }: any) =>
      theme?.isMobile && appType === 'app'
        ? css`
            position: initial;
            height: 100vh;
          `
        : css`
            height: 100%;
          `}
  }    
  
  body {
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    margin: 0;
    padding: 0;   
    font-size: 14px;
    background-color: ${({ theme }) => theme?.mainBackground};
    background-image: ${({ theme }) => theme?.mainGradient};
    color: ${({ theme }) => theme.textColor?.primary};
    width: 100%;
    
        ${({ theme, appType }: any) =>
          theme?.isMobile && appType === 'app'
            ? css`
                position: fixed;
              `
            : css`
                height: 100%;
              `}
    
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
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    font-weight: 600;
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
  
  
  .tox {
    .tox-collection--list {
      [aria-checked='true'] {
        background: ${({ theme }) => rgba(theme?.textColor?.primary, 0.1)} !important;
        * {
          background: transparent !important;
        }
        
        svg {
          fill: ${({ theme }) => theme?.textColor.primary} !important;
        }
      }
      .tox-collection__item--active {
        background: ${({ theme }) => rgba(theme?.textColor?.primary, 0.05)} !important;
        * {
          background: transparent !important;
        }
      }
    }
    .tox-split-button {
      &:hover {
       background: ${({ theme }) => rgba(theme?.textColor?.primary, 0.1)} !important;
      }
    }
    .tox-collection--toolbar {
      .tox-collection__item--enabled {
        background: ${({ theme }) => rgba(theme?.textColor?.primary, 0.1)} !important;
      }
      .tox-collection__item--active {
        background: ${({ theme }) => rgba(theme?.textColor?.primary, 0.1)} !important;
      }
    }
    .tox-menu {
      color: ${({ theme }) => theme?.textColor?.primary} !important;
      background: ${({ theme }) => theme?.background?.primary} !important;
      
      svg {
        color: ${({ theme }) => theme?.textColor?.primary} !important;
      }
    }
    .tox-toolbar__overflow {
      background: ${({ theme }) => theme?.background?.primary} !important;
      
      .tox-tbtn--enabled {
         background: ${({ theme }) => rgba(theme?.textColor?.primary, 0.1)} !important;
      }
      
      span,
      button {
        &:active,
        &:focus,
        &:hover {
           background: ${({ theme }) => rgba(theme?.textColor?.primary, 0.05)} !important;
        }
      }
      
      [aria-pressed='true'] {
          background: ${({ theme }) => rgba(theme?.textColor?.primary, 0.1)} !important;
        }
      
      svg {
        fill: ${({ theme }) => theme?.textColor?.primary} !important;
      }
    }
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
