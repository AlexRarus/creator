import styled, { css } from 'styled-components';
import { COLORS } from 'src/components/theme';
import { MENU_HEIGHT } from 'src/components/menu/constants';

export interface ICarousel {
  width: number;
  order?: number;
  length?: number;
}

export interface ICarouselItem {
  imageUrl: string;
  width: number;
}

export interface ScreenViewport {
  width: number;
  screenOrder?: number;
}

const calcPhoneWidth = ({ theme, width }: any) => {
  const { isMobile, isTablet } = theme;
  if (isMobile || isTablet) {
    return (width / 7) * 5;
  }
  return width;
};

export const getPhonePosition = ({ theme, screenOrder }: any) => {
  const { isTablet, isMobile } = theme;
  if (isMobile) {
    return screenOrder === 1
      ? css`
          top: 40px;
          right: 40px;
        `
      : css`
          top: 56px;
          left: 40px;
        `;
  }

  if (isTablet) {
    return screenOrder === 1
      ? css`
          bottom: 140px;
          right: 14px;
        `
      : css`
          bottom: 160px;
          right: 160px;
        `;
  }

  return screenOrder === 1
    ? css`
        bottom: -40px;
        right: 40px;
      `
    : css`
        bottom: -100px;
        right: 240px;
      `;
};

const calcCarouselWidth = ({ theme, width, length = 1 }: any) => {
  const { isMobile, isTablet } = theme;
  if (isMobile || isTablet) {
    return (width / 7) * 5 * length;
  }
  return width * length;
};

const calcCarouselLeft = ({ order = 0, width, theme }: any) => {
  const { isMobile, isTablet } = theme;
  if (isMobile || isTablet) {
    return -(width / 7) * 5 * order;
  }
  return -width * order;
};

const calcAllowCarouselHeight = ({ theme, width, length = 1 }: any) => {
  const { isMobile, isTablet } = theme;
  if (isMobile || isTablet) {
    return (width / 7) * 5 * 2 * length;
  }
  return width * 2.1 * length;
};

const calcAllowCarouselTop = ({ order = 0, width, theme }: any) => {
  const { isMobile, isTablet } = theme;
  if (isMobile || isTablet) {
    return -(width / 7) * 2 * 5 * order;
  }
  return -width * 2 * order;
};

const getHeaderFontSize = (props: any) => {
  const {
    theme: { isTablet, isMobile },
  } = props;
  if (isMobile) {
    return '36px;';
  }
  if (isTablet) {
    return '38px';
  }
  return '46px';
};

const getStartRowStyles = (props: any) => {
  const {
    theme: { isTablet, isMobile },
  } = props;
  if (isMobile || isTablet) {
    return css`
      display: flex;
      flex-direction: column;
      width: 100%;
      button {
        margin-top: 16px;
        width: 100%;
      }
    `;
  }
  return css`
    display: flex;
    flex-direction: row;
    width: 50%;
    min-width: 500px;
    button {
      margin-left: 16px;
    }
  `;
};

const getStylesExamplesBlock = ({ theme }: any) => {
  const { isMobile, isTablet } = theme;

  if (isMobile) {
    return css`
      width: calc(100% - 24px);
      margin-top: 360px;
      margin-left: 24px;
      max-width: 100%;
    `;
  }

  if (isTablet) {
    return css`
      max-width: 40%;
      margin-left: 24px;
    `;
  }

  return css`
    max-width: 40%;
    margin-left: 80px;
  `;
};

const getFooterStyles = ({ theme }: any) => {
  const { isMobile } = theme;

  if (isMobile) {
    return css`
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      padding: 20px;
    `;
  }

  return css`
    flex-direction: row;
    justify-content: space-between;
    padding: 40px;
  `;
};

const getStylesExamplesHeader = ({ theme }: any) => {
  const { isMobile } = theme;

  if (isMobile) {
    return css`
      font-size: 34px;
      font-weight: 600;
    `;
  }

  return css`
    font-size: 40px;
    font-weight: 700;
  `;
};

const getStylesExamplesSeparate = ({ theme }: any) => {
  const { isMobile } = theme;

  if (isMobile) {
    return css`
      margin: 16px 0;
    `;
  }

  return css`
    margin: 32px 0;
  `;
};

const getStylesExamplesLink = ({ theme }: any) => {
  const { isMobile } = theme;

  if (isMobile) {
    return css`
      font-size: 16px;
    `;
  }

  return css`
    font-size: 18px;
  `;
};

const getStylesExamplesLinks = ({ theme }: any) => {
  const { isMobile } = theme;

  if (isMobile) {
    return css`
      position: absolute;
      top: 8px;
      left: 50%;
      transform: translateX(-50%);
    `;
  }

  return css``;
};

const getStylesAllowPart = ({ theme }: any) => {
  const { isMobile } = theme;

  if (isMobile) {
    return css`
      padding: 40px 20px 20px 20px;
    `;
  }

  return css`120px 24px 24px 24px`;
};

export const MainPageWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  padding-top: ${MENU_HEIGHT}px;
`;

export const LandingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  flex-direction: column;
`;

export const LandingPart = styled.div<{ background?: string; padding?: any }>`
  position: relative;
  display: flex;
  align-items: center;
  padding: ${({ padding }) =>
    padding ? `${padding.top} ${padding.right} ${padding.bottom} ${padding.left}` : '200px 24px'};
  width: 100%;
  flex-direction: column;
  background-color: ${({ background }) => (background ? background : COLORS.white)};
`;

export const AllowPart = styled.div<{ background?: string }>`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: column;
  background-color: ${({ background }) => (background ? background : COLORS.white)};
  ${getStylesAllowPart}
`;

export const WelcomeTitle = styled.div<{ isLight?: boolean }>`
  font-size: ${getHeaderFontSize};
  font-weight: 600;
  text-align: center;
  color: ${({ isLight }) => (isLight ? COLORS.white : COLORS.grey[900])};
`;

export const WelcomeSpan = styled.div<{ isLight?: boolean }>`
  margin-top: 10px;
  font-size: 20px;
  text-align: center;
  color: ${({ isLight }) => (isLight ? COLORS.grey[400] : COLORS.grey[800])};
`;

export const StartRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  ${getStartRowStyles}
`;

export const ScreenOfPhone = styled.div<ScreenViewport>`
  position: absolute;
  ${getPhonePosition}
  border-radius: 24px;
  display: flex;
  width: ${calcPhoneWidth}px;
  height: ${({ theme, width }) => calcPhoneWidth({ theme, width }) * 2}px;
  overflow: hidden;
  z-index: 1;
  border: 8px solid ${COLORS.blueGrey[300]};
  box-sizing: content-box;

  &:before {
    position: absolute;
    content: '';
    width: 50%;
    height: 16px;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    background: ${COLORS.blueGrey[300]};
    border-radius: 0 0 12px 12px;
    z-index: 1;
  }
`;

export const ScreenImage = styled.div<ICarouselItem>`
  width: ${calcPhoneWidth}px;
  height: ${({ theme, width }) => calcPhoneWidth({ theme, width }) * 2}px;
  background-image: url(${({ imageUrl }) => imageUrl});
  background-repeat: no-repeat;
  background-size: cover;
`;

export const ScreensList = styled.div<ICarousel>`
  position: absolute;
  display: flex;
  align-items: center;
  height: 100%;
  left: ${calcCarouselLeft}px;
  width: ${calcCarouselWidth}px;
  transition: all 0.3s;
`;

export const LandingExamplesBlock = styled.div`
  display: flex;
  align-self: flex-start;
  flex-direction: column;
  ${getStylesExamplesBlock}
`;

export const ExamplesLinks = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  ${getStylesExamplesLinks}
`;

export const ExampleLink = styled.div<{ isSelected?: boolean }>`
  font-weight: 700;
  line-height: 24px;
  text-transform: uppercase;
  color: ${({ isSelected }) => (isSelected ? COLORS.deepPurple.A700 : COLORS.indigo[800])};
  position: relative;
  white-space: nowrap;
  padding-right: 34px;
  cursor: pointer;
  ${getStylesExamplesLink}

  &:before {
    content: '';
    position: absolute;
    width: 4px;
    height: 4px;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    background: ${COLORS.deepPurple[500]};
    border-radius: 50%;
  }

  :last-child {
    padding-right: 0;
    &:before {
      display: none;
    }
  }
`;

export const ExamplesHeader = styled.div`
  color: ${COLORS.grey[900]};
  position: relative;
  ${getStylesExamplesHeader}

  &svg {
    fill: ${COLORS.deepPurple[500]};
  }
`;

export const HeaderIconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 40px;
  height: 40px;
  left: -40px;
`;

export const ExamplesSeparate = styled.div`
  height: 3px;
  width: 100px;
  border-radius: 3px;
  background-color: ${COLORS.deepPurple[500]};
  ${getStylesExamplesSeparate}
`;

export const ExamplesContent = styled.div`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 1.6;
  color: ${COLORS.grey[700]};
  margin-bottom: 28px;
`;

export const LandingFooter = styled.div`
  display: flex;
  width: 100%;
  background: ${COLORS.blueGrey[700]};
  ${getFooterStyles}
`;

export const FooterItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 14px;
  margin-bottom: 12px;
  height: 100px;

  :last-child {
    justify-content: space-between;
  }
`;

export const ItemHeader = styled.div`
  text-transform: uppercase;
  font-weight: 600;
  font-size: 16px;
  margin: 4px 0;
  color: ${COLORS.white};
`;

export const ItemRow = styled.div`
  display: flex;
  align-items: center;
  color: ${COLORS.grey[400]};
  font-size: 14px;
  padding: 4px 0;
  cursor: pointer;
`;

export const LangRow = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${COLORS.grey[400]};
`;

export const Flag = styled.div`
  display: flex;
  width: 20px;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  height: 20px;
  margin-right: 6px;
`;

export const FooterIconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-right: 4px;
`;

export const Allows = styled.div`
  display: flex;
  width: 100%;
`;

export const AllowBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 0 12px;
`;

export const AllowHeader = styled.div`
  font-size: 40px;
  font-weight: 700;
  padding-bottom: 32px;
  color: ${COLORS.grey[900]};
`;

export const AllowList = styled.div`
  margin-top: 24px;
`;

export const AllowRow = styled.div<{ isSelected?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 32px;
  margin-bottom: 32px;
  font-size: 20px;
  color: ${({ isSelected }) => (isSelected ? COLORS.grey[900] : COLORS.indigo[900])};
  transition: all 0.3s;
  cursor: pointer;
`;

export const AllowIndicatorBox = styled.div<{ isSelected?: boolean }>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: ${({ isSelected }) => (isSelected ? -6 : 0)}px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 50%;
  background: ${({ isSelected }) => (isSelected ? COLORS.deepPurple[500] : COLORS.deepPurple[900])};
  width: ${({ isSelected }) => (isSelected ? 24 : 12)}px;
  height: ${({ isSelected }) => (isSelected ? 24 : 12)}px;
  transition: all 0.3s;
`;

export const AllowScreen = styled.div<ScreenViewport>`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  border-radius: 24px;
  display: flex;
  width: ${calcPhoneWidth}px;
  height: ${({ theme, width }) => calcPhoneWidth({ theme, width }) * 2}px;
  overflow: hidden;
  z-index: 1;
  border: 8px solid ${COLORS.blueGrey[100]};
  box-sizing: content-box;

  &:before {
    position: absolute;
    content: '';
    width: 50%;
    height: 16px;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    background: ${COLORS.blueGrey[100]};
    border-radius: 0 0 12px 12px;
    z-index: 1;
  }
`;

export const AllowScreensList = styled.div<ICarousel>`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  top: ${calcAllowCarouselTop}px;
  height: ${calcAllowCarouselHeight}px;
  transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
`;
