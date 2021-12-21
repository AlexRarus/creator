import styled from 'styled-components';
import { COLORS } from 'src/components/theme';

export const ThemesWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const ThemesHeader = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => (theme?.isMobile ? '12px' : '20px')};
`;

export const ThemesHeaderTitle = styled.div`
  display: flex;
  font-weight: 500;
  font-size: ${({ theme }) => (theme?.isMobile ? '18px' : '20px')};
`;

export const CreateButton = styled.div`
  background: ${COLORS.white};
  color: ${COLORS.black};
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 1px 8px ${COLORS.blue[500]};
  cursor: pointer;
  user-select: none;

  * {
    cursor: pointer;
  }
`;

export const SwiperWrapper = styled.div<{ width?: number }>`
  position: relative;
  height: 100%;
  width: ${({ width }) => width}px;

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

export const PhoneWrapper = styled.div<{ isSelected?: boolean; color: string }>`
  position: relative;
  width: 320px;
  height: 560px;
  border: 2px solid ${({ color }) => color};
  border-radius: 30px;
  overflow: hidden;
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

export const ThemeItemBackground = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: ${({ color }) => color};
  padding: 10px 10px 20px 10px;
`;

export const ThemeItemHeader = styled.div<{ color: string }>`
  padding: 20px 0;
  font-size: 20px;
  font-weight: bold;
  color: ${({ color }) => color};
`;

export const ThemeItemText = styled.div<{ color: string }>`
  display: flex;
  padding: 20px 0;
  font-size: 14px;
  text-align: initial;
  color: ${({ color }) => color};
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
