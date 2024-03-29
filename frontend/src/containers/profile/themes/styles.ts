import styled from 'styled-components';
import { COLORS } from 'src/components/theme';
import { ITheme } from 'src/dal/themes/interfaces';
import { getUserThemeStyles } from 'src/dal/themes/style';

export const ThemesWrapper = styled.div<{ width?: number }>`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: ${({ width }) => width}px;
`;

export const CreateButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: ${COLORS.white};
  color: ${COLORS.black};
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;

  * {
    cursor: pointer;
  }
`;

export const CreateButtonIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${COLORS.grey[500]};

  svg {
    font-size: 50px;
  }
`;

export const CreateButtonLabel = styled.div`
  margin-top: 10px;
`;

export const SwiperWrapper = styled.div<{ width?: number }>`
  position: relative;
  height: 100%;
  width: 100%;

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const PhoneWrapper = styled.div<{ isSelected?: boolean; color?: string }>`
  position: relative;
  width: 320px;
  height: 560px;
  border: 2px solid ${({ color = COLORS.black }) => color};
  border-radius: 30px;
  overflow: hidden;
  z-index: 2;
  ${({ theme }) =>
    !theme?.isMobile &&
    `
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 32px;
  `}

  &:before {
    display: ${({ isSelected }) => (isSelected ? 'block' : 'none')};
    position: absolute;
    top: 20px;
    right: 20px;
    content: '';
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: linear-gradient(180deg, ${COLORS.green[100]} 0%, ${COLORS.green[500]} 100%);
  }
`;

export const ThemeItemBackground = styled.div<{ selectedTheme: ITheme | null }>`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 10px 10px 20px 10px;
  ${({ selectedTheme }) => getUserThemeStyles(selectedTheme)}
`;

export const ThemeItemHeader = styled.div<{ color: string }>`
  padding: 20px 0;
  font-size: 20px;
  font-weight: bold;
  color: ${({ color }) => color};
  position: relative;
`;

export const ThemeItemText = styled.div<{ color: string }>`
  display: flex;
  padding: 20px 0;
  font-size: 14px;
  text-align: initial;
  color: ${({ color }) => color};
  position: relative;
`;

export const ActionRow = styled.div`
  z-index: 1;
  position: absolute;
  width: 200px;
  left: 50%;
  bottom: 60px;
  transform: translateX(-50%);
  height: 40px;
`;

export const UserBlock = styled.div<{ color: string }>`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  margin-top: 32px;
  margin-bottom: 24px;
  background-color: ${({ color }) => color};
`;

export const EmptyBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
  font-size: 20px;
  font-weight: 500;
  text-align: center;
`;

export const SuccessLabel = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;

  & svg {
    margin-left: 8px;
  }
`;
