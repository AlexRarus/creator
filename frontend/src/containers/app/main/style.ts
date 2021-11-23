import styled, { css } from 'styled-components';
import { COLORS } from 'src/components/theme';
import { MENU_HEIGHT } from 'src/components/menu/constants';

export interface IMobile {
  isMobile?: boolean;
}

export interface ICarousel {
  width: number;
  isMobile?: boolean;
  order?: number;
  length?: number;
}

export interface ICarouselItem {
  imageUrl: string;
  width: number;
  isMobile?: boolean;
}

export interface ScreenViewport {
  width: number;
  bottom?: number;
  right?: number;
  isMobile?: boolean;
}

const calcPhoneWidth = ({ isMobile, width }: ICarousel) => {
  if (isMobile) {
    return (width / 7) * 5;
  }
  return width;
};

const calcCarouselWidth = ({ isMobile, width, length = 1 }: ICarousel) => {
  if (isMobile) {
    return (width / 7) * 5 * length;
  }
  return width * length;
};

const calcCarouselLeft = ({ order = 0, width, isMobile }: ICarousel) => {
  if (isMobile) {
    return -(width / 7) * 5 * order;
  }
  return -width * order;
};

const calcAllowCarouselHeight = ({ isMobile, width, length = 1 }: ICarousel) => {
  if (isMobile) {
    return (width / 7) * 5 * 2 * length;
  }
  return width * 2.1 * length;
};

const calcAllowCarouselTop = ({ order = 0, width, isMobile }: ICarousel) => {
  if (isMobile) {
    return -(width / 7) * 2 * 5 * order;
  }
  return -width * 2 * order;
};

const getMobileStyles = (props: IMobile) => {
  if (props.isMobile) {
    return css`
      display: flex;
      flex-direction: column;
      width: 100%;
    `;
  } else {
    return css`
      display: flex;
      flex-direction: row;
      width: 50%;
      min-width: 500px;
    `;
  }
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

export const WelcomeTitle = styled.div<{ isLight?: boolean }>`
  font-size: 46px;
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

export const StartRow = styled.div<IMobile>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;

  button {
    ${({ isMobile }) =>
      isMobile
        ? css`
            margin-top: 16px;
            width: 100%;
          `
        : css`
            margin-left: 16px;
          `}
  }

  ${getMobileStyles}
`;

export const ScreenOfPhone = styled.div<ScreenViewport>`
  position: absolute;
  right: ${({ right }) => right}px;
  bottom: ${({ bottom }) => bottom}px;
  border-radius: 24px;
  display: flex;
  width: ${calcPhoneWidth}px;
  height: ${({ isMobile, width }) => calcPhoneWidth({ isMobile, width }) * 2}px;
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
  height: ${({ isMobile, width }) => calcPhoneWidth({ isMobile, width }) * 2}px;
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

export const LandingExamplesBlock = styled.div<IMobile>`
  display: flex;
  align-self: flex-start;
  flex-direction: column;
  max-width: 40%;
  margin-left: ${({ isMobile }) => (isMobile ? 24 : 80)}px;
`;

export const ExamplesLinks = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

export const ExampleLink = styled.div`
  font-weight: 700;
  font-size: 12px;
  line-height: 24px;
  text-transform: uppercase;
  color: ${COLORS.indigo[800]};
  position: relative;
  white-space: nowrap;
  padding-right: 34px;
  cursor: pointer;

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
  font-size: 40px;
  color: ${COLORS.grey[900]};
  position: relative;
  font-weight: 700;

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
  margin-top: 30px;
  margin-bottom: 30px;
  height: 3px;
  width: 100px;
  border-radius: 3px;
  background-color: ${COLORS.deepPurple[500]};
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
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 40px 40px;
  background: ${COLORS.blueGrey[700]};
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
  height: ${({ isMobile, width }) => calcPhoneWidth({ isMobile, width }) * 2}px;
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
