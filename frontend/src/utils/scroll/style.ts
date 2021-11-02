import { createGlobalStyle, css } from 'styled-components';
import { COLORS } from 'src/components/theme';

export const GlobalStyle = createGlobalStyle<{
  isScrolling: boolean;
  isWin: boolean;
  baseBackground?: string;
}>`
  body.noscrollwithscrollbar {
    position: fixed;
    overflow-y: scroll;
    width: 100%;
  }

  body.noscroll {
    position: fixed;
    overflow-y: hidden;
    width: 100%;
  }

  ${({ isWin, baseBackground, isScrolling }) =>
    isWin
      ? css`
          body::-webkit-scrollbar {
            width: 15px;
          }

          body::-webkit-scrollbar-track {
            background: ${baseBackground || 'transparent'};
          }

          body::-webkit-scrollbar-thumb {
            background-color: ${isScrolling ? COLORS.grey[200] : 'transparent'};
            border: 3px solid transparent;
            border-radius: 9px;
            background-clip: content-box;
          }

          body::-webkit-scrollbar-thumb:hover {
            background-color: ${COLORS.grey[400]};
            border: 3px solid transparent;
            border-radius: 9px;
            background-clip: content-box;
          }
        `
      : ''}
`;
