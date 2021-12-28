import styled, { css, keyframes } from 'styled-components';
import { rgba, darken, lighten } from 'polished';
import { Link } from 'react-router-dom';
import { ITheme } from 'src/dal/themes/interfaces';
import { IButtonData } from 'src/dal/blocks/button-interfaces';

import { IListItemIconProps } from '../list/style';

interface IButton {
  data: IButtonData;
  isIcon: boolean;
  selectedTheme?: ITheme | null;
  height?: string;
}

export const buttonKinds = [
  'simple',
  'static',
  'shadowTech',
  'cyber',
  'alpine',
  'loom',
  'toast',
  'milan',
];

const cyberSlice0 = `inset(50% 50% 50% 50%)`;
const cyberSlice1 = `inset(80% -6px 0 0)`;
const cyberSlice2 = `inset(50% -6px 30% 0)`;
const cyberSlice3 = `inset(10% -6px 85% 0)`;
const cyberSlice4 = `inset(40% -6px 43% 0)`;
const cyberSlice5 = `inset(80% -6px 5% 0)`;

const glitch = keyframes`
 0% {
    clip-path: ${cyberSlice1};
  transform: translate(-20px, -10px);
}
  10% {
    clip-path: ${cyberSlice3};
  transform: translate(10px, 10px);
}
  20% {
    clip-path: ${cyberSlice1};
  transform: translate(-10px, 10px);
}
  30% {
    clip-path: ${cyberSlice3};
  transform: translate(0px, 5px);
}
  40% {
    clip-path: ${cyberSlice2};
  transform: translate(-5px, 0px);
}
  50% {
    clip-path: ${cyberSlice3};
  transform: translate(5px, 0px);
}
  60% {
    clip-path: ${cyberSlice4};
  transform: translate(5px, 10px);
}
  70% {
    clip-path: ${cyberSlice2};
  transform: translate(-10px, 10px);
}
  80% {
    clip-path: ${cyberSlice5};
  transform: translate(20px, -10px);
}
  90% {
    clip-path: ${cyberSlice1};
  transform: translate(-10px, 0px);
}
  100% {
    clip-path: ${cyberSlice1};
  transform: translate(0);
}
`;

const getStyledButtonImpact = (buttonData: IButtonData, selectedTheme?: ITheme | null) => {
  const { kind: buttonKind, backgroundColor: buttonBackground } = buttonData;
  const kind = buttonKind || selectedTheme?.buttonKind || 'simple';
  const background = buttonBackground || selectedTheme?.buttonBackground || '#00FF00';

  switch (kind) {
    case 'simple':
      return css`
        align-items: center;
        appearance: none;
        border-radius: 4px;
        border-style: none;
        box-shadow: rgba(0, 0, 0, 0.2) 0 3px 1px -2px, rgba(0, 0, 0, 0.14) 0 2px 2px 0,
          rgba(0, 0, 0, 0.12) 0 1px 5px 0;
        box-sizing: border-box;
        cursor: pointer;
        display: inline-flex;
        font-family: Roboto, sans-serif;
        font-size: 0.875rem;
        font-weight: 500;
        justify-content: center;
        letter-spacing: 0.0892857em;
        line-height: normal;
        outline: none;
        overflow: visible;
        position: relative;
        text-align: center;
        text-decoration: none;
        text-transform: uppercase;
        transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        vertical-align: middle;
        will-change: transform, opacity;

        :hover {
          box-shadow: rgba(0, 0, 0, 0.2) 0 2px 4px -1px, rgba(0, 0, 0, 0.14) 0 4px 5px 0,
            rgba(0, 0, 0, 0.12) 0 1px 10px 0;
        }

        :disabled {
          background-color: rgba(0, 0, 0, 0.12);
          box-shadow: rgba(0, 0, 0, 0.2) 0 0 0 0, rgba(0, 0, 0, 0.14) 0 0 0 0,
            rgba(0, 0, 0, 0.12) 0 0 0 0;
          color: rgba(0, 0, 0, 0.37);
          cursor: default;
          pointer-events: none;
        }

        :not(:disabled) {
          background-color: ${background};
        }

        :focus {
          box-shadow: rgba(0, 0, 0, 0.2) 0 2px 4px -1px, rgba(0, 0, 0, 0.14) 0 4px 5px 0,
            rgba(0, 0, 0, 0.12) 0 1px 10px 0;
        }

        :active {
          box-shadow: rgba(0, 0, 0, 0.2) 0 5px 5px -3px, rgba(0, 0, 0, 0.14) 0 8px 10px 1px,
            rgba(0, 0, 0, 0.12) 0 3px 14px 2px;
          background: ${lighten(0.1, background)};
        }
      `;
    case 'shadowTech':
      return css`
        align-items: center;
        background-clip: padding-box;
        background-color: initial;
        background-image: none;
        border-style: none;
        box-sizing: border-box;
        cursor: pointer;
        appearance: none;
        flex-shrink: 0;
        font-size: 16px;
        font-weight: 800;
        justify-content: center;
        margin: 0;
        outline: none;
        overflow: visible;
        pointer-events: auto;
        position: relative;
        text-align: center;
        text-decoration: none;
        text-transform: none;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        vertical-align: middle;
        word-break: keep-all;
        z-index: 0;

        :before,
        :after {
          border-radius: 80px;
        }

        :before {
          background-color: ${rgba(background as string, 0.32)};
          content: '';
          display: block;
          height: 100%;
          left: 0;
          overflow: hidden;
          position: absolute;
          top: 0;
          width: 100%;
          z-index: -2;
        }

        :after {
          background-color: initial;
          background-image: linear-gradient(92.83deg, ${background} 0, ${background} 100%);
          bottom: 4px;
          content: '';
          display: block;
          left: 4px;
          overflow: hidden;
          position: absolute;
          right: 4px;
          top: 4px;
          transition: all 100ms ease-out;
          z-index: -1;
        }

        :hover:not(:disabled):after {
          bottom: 0;
          left: 0;
          right: 0;
          top: 0;
          transition-timing-function: ease-in;
        }

        :active:not(:disabled) {
          color: #ccc;
        }

        :active:not(:disabled):after {
          background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
            linear-gradient(92.83deg, ${background} 0, ${background} 100%);
          bottom: 4px;
          left: 4px;
          right: 4px;
          top: 4px;
        }

        :disabled {
          cursor: default;
          opacity: 0.24;
        }
      `;
    case 'cyber':
      return css`
        font-size: 20px;
        font-family: 'Bebas Neue', sans-serif;
        background: linear-gradient(45deg, transparent 5%, ${background} 5%);
        border: 0;
        letter-spacing: 3px;
        box-shadow: 6px 0px 0px #00e6f6;
        outline: transparent;
        position: relative;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        :after {
          font-size: 20px;
          font-family: 'Bebas Neue', sans-serif;
          background: linear-gradient(45deg, transparent 5%, ${background} 5%);
          border: 0;
          letter-spacing: 3px;
          box-shadow: 6px 0 0 #00e6f6;
          outline: transparent;
          position: relative;
          user-select: none;
          -webkit-user-select: none;
          touch-action: manipulation;
        }
        :after {
          content: 'CYBER TEXT';
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            45deg,
            transparent 3%,
            #00e6f6 3%,
            #00e6f6 5%,
            ${background} 5%
          );
          text-shadow: -3px -3px 0px #f8f005, 3px 3px 0px #00e6f6;
          clip-path: ${cyberSlice0};
        }
        :hover:after {
          animation: 1s ${glitch};
          animation-timing-function: steps(2, end);
        }
      `;
    case 'alpine':
      return css`
        background-color: ${background};
        border: 0 solid #e5e7eb;
        box-sizing: border-box;
        display: flex;
        font-family: ui-sans-serif, system-ui, -apple-system, system-ui, 'Segoe UI', Roboto,
          'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
          'Segoe UI Symbol', 'Noto Color Emoji';
        font-size: 1rem;
        font-weight: 700;
        justify-content: center;
        padding: 0.75rem 1.65rem;
        position: relative;
        text-align: center;
        text-decoration: none;
        text-decoration-thickness: auto;
        width: 100%;
        position: relative;
        cursor: pointer;
        transform: rotate(-2deg);
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;

        :focus {
          outline: 0;
        }

        :after {
          content: '';
          position: absolute;
          border: 1px solid #000000;
          bottom: 4px;
          left: 4px;
          width: calc(100% - 1px);
          height: calc(100% - 1px);
        }

        :hover:after {
          bottom: 2px;
          left: 2px;
        }
      `;
    case 'loom':
      return css`
        position: relative;
        text-align: left;
        text-decoration: none;
        transform: translateZ(0) scale(1);
        transition: transform 0.2s;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;

        :disabled {
          cursor: auto;
        }

        :not(:disabled):hover {
          transform: scale(1.05);
        }

        :not(:disabled):hover:active {
          transform: scale(1.05) translateY(0.125rem);
        }

        :focus {
          outline: 0 solid transparent;
        }

        :focus:before {
          border-width: 0.125rem;
          content: '';
          left: calc(-1 * 0.375rem);
          pointer-events: none;
          position: absolute;
          top: calc(-1 * 0.375rem);
          transition: border-radius;
          user-select: none;
        }

        :not(:disabled):active {
          transform: translateY(0.125rem);
        }
      `;
    case 'toast':
      return css`
        appearance: initial;
        background-color: transparent;
        background-image: linear-gradient(to bottom, ${background}, ${darken(0.05, background)});
        border: 0 solid #e5e7eb;
        border-radius: 0.5rem;
        box-sizing: border-box;
        column-gap: 1rem;
        cursor: pointer;
        display: flex;
        font-family: ui-sans-serif, system-ui, -apple-system, system-ui, 'Segoe UI', Roboto,
          'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
          'Segoe UI Symbol', 'Noto Color Emoji';
        font-size: 100%;
        font-weight: 700;
        margin: 0;
        outline: 2px solid transparent;
        text-align: center;
        text-transform: none;
        transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        box-shadow: -6px 8px 10px rgba(81, 41, 10, 0.1), 0px 2px 2px rgba(81, 41, 10, 0.2);

        :active {
          background-color: ${background};
          box-shadow: -1px 2px 5px rgba(81, 41, 10, 0.15), 0px 1px 1px rgba(81, 41, 10, 0.15);
          transform: translateY(0.125rem);
        }

        :focus {
          box-shadow: ${rgba(background, 0.46)} 0 0 0 4px, -6px 8px 10px ${rgba(background, 0.1)},
            0px 2px 2px ${rgba(background, 0.2)};
        }
      `;
    case 'milan':
      return css`
        background: transparent;
        font-family: 'Open Sans', sans-serif;
        font-size: 16px;
        letter-spacing: 2px;
        text-decoration: none;
        cursor: pointer;
        color: ${background};
        border: 3px solid ${background};
        padding: 0.25em 0.5em;
        box-shadow: 1px 1px 0 0 ${background}, 2px 2px 0 0 ${background}, 3px 3px 0 0 ${background},
          4px 4px 0 0 ${background}, 5px 5px 0 0 ${background};
        position: relative;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;

        :active {
          box-shadow: 0 0 0 0;
          top: 5px;
          left: 5px;
        }
      `;
    case 'static':
    default:
      return css`
        appearance: none;
        backface-visibility: hidden;
        border-radius: 8px;
        border-style: none;
        box-shadow: rgba(39, 174, 96, 0.15) 0 4px 9px;
        box-sizing: border-box;
        cursor: pointer;
        font-family: Inter, -apple-system, system-ui, 'Segoe UI', Helvetica, Arial, sans-serif;
        font-size: 16px;
        font-weight: 600;
        letter-spacing: normal;
        outline: none;
        overflow: hidden;
        position: relative;
        text-align: center;
        text-decoration: none;
        transform: translate3d(0, 0, 0);
        transition: all 0.3s;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        vertical-align: top;
        white-space: nowrap;

        :hover {
          background-color: ${darken(0.05, background)};
          opacity: 1;
          transform: translateY(0);
          transition-duration: 0.35s;
        }

        :active {
          transform: translateY(2px);
          transition-duration: 0.35s;
        }

        :hover {
          box-shadow: rgba(39, 174, 96, 0.2) 0 6px 12px;
        }
      `;
  }
};

export const ButtonBlock = styled.button<IButton>`
  position: relative;
  display: flex;
  border-style: none;
  text-decoration: none;
  flex-direction: column;
  padding: 8px 14px;
  align-items: center;
  width: 100%;
  cursor: pointer;
  ${({ isIcon }) => isIcon && 'padding-left: 44px;'}
  color: ${({ data }) => data.color};
  a {
    color: ${({ data }) => data.color};
  }
  ${({ selectedTheme, data }) => getStyledButtonImpact(data, selectedTheme)}
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
`;

export const SubTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
`;

export const WebLink = styled.a`
  display: flex;
  text-decoration: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const InnerLink = styled(Link)`
  display: flex;
  text-decoration: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const ButtonContent = styled.div`
  display: flex;
  text-decoration: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const IconTemplateButton = styled.div<IListItemIconProps>`
  grid-area: icon;
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  overflow: hidden;
`;

export const IconElement = styled.img`
  max-width: 100%;
  max-height: 100%;
`;
