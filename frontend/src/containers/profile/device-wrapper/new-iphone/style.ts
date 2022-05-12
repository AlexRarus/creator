import styled from 'styled-components';
import { COLORS } from 'src/components/theme';

export const DeviceWrapper = styled.div`
  display: inline-block;
  position: relative;
  box-sizing: content-box !important;
`;

export const Speaker = styled.i``;
export const Camera = styled.b``;

export const IphoneX = styled(DeviceWrapper)`
  position: relative;
  margin: 40px auto;
  width: 360px;
  height: 780px;
  background-color: #7371ee;
  background-image: linear-gradient(60deg, #7371ee 1%, #a1d9d6 100%);
  border-radius: 40px;
  box-shadow: 0px 0px 0px 11px
      ${({ theme }) => (theme?.themeType === 'light' ? COLORS.grey[100] : COLORS.grey[900])},
    0px 0px 0px 13px
      ${({ theme }) => (theme?.themeType === 'light' ? COLORS.grey[200] : COLORS.grey['A700'])},
    0px 0px 0px 20px ${({ theme }) => (theme?.themeType === 'light' ? COLORS.white : COLORS.black)};

  &:before,
  &:after {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
  }

  // home button indicator
  &:after {
    bottom: 7px;
    width: 140px;
    height: 4px;
    background-color: #f2f2f2;
    border-radius: 10px;
    z-index: 2;
  }

  // frontal camera/speaker frame
  &:before {
    top: 0px;
    width: 56%;
    height: 30px;
    background-color: ${({ theme }) =>
      theme?.themeType === 'light' ? COLORS.grey[100] : COLORS.grey[900]};
    border-radius: 0px 0px 40px 40px;
    z-index: 2;
  }

  ${Speaker},
  ${Camera} {
    position: absolute;
    display: block;
    color: transparent;
    z-index: 2;
  }

  // speaker
  ${Speaker} {
    top: 0px;
    left: 50%;
    transform: translate(-50%, 6px);
    height: 8px;
    width: 15%;
    background-color: #101010;
    border-radius: 8px;
    box-shadow: inset 0px -3px 3px 0px rgba(256, 256, 256, 0.2);
    z-index: 2;
  }

  // camera
  ${Camera} {
    left: 10%;
    top: 0px;
    transform: translate(180px, 4px);
    width: 12px;
    height: 12px;
    background-color: #101010;
    border-radius: 12px;
    box-shadow: inset 0px -3px 2px 0px rgba(256, 256, 256, 0.2);

    &:after {
      content: '';
      position: absolute;
      background-color: #2d4d76;
      width: 6px;
      height: 6px;
      top: 2px;
      left: 2px;
      top: 3px;
      left: 3px;
      display: block;
      border-radius: 4px;
      box-shadow: inset 0px -2px 2px rgba(0, 0, 0, 0.5);
    }
  }
`;

export const ContentBlock = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1;
  border-radius: 40px;
  overflow: hidden;
`;
