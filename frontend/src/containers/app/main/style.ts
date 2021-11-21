import styled, { css } from 'styled-components';
import { rgba } from 'polished';
import { COLORS } from 'src/components/theme';

export interface IMobile {
  isMobile?: boolean;
}

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
  padding: 24px;
  background-color: ${rgba(COLORS.indigo.A700, 0.2)};
`;

export const LandingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  flex-direction: column;
`;

export const WelcomeTitle = styled.div`
  font-size: 46px;
  font-weight: 600;
  text-align: center;
  color: ${COLORS.grey[900]};
`;

export const WelcomeSpan = styled.div`
  margin-top: 10px;
  font-size: 20px;
  text-align: center;
  color: ${COLORS.grey[800]};
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
