import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { COLORS } from 'src/components/theme';
import LogoSvg from 'src/assets/logo.svg';
import DarkLogoSvg from 'src/assets/dark-logo.svg';

export const ButtonLink = styled(Link)`
  text-decoration: none;
  padding: 5px 10px;
  color: ${COLORS.grey[500]};
  border: 1px solid ${COLORS.grey[500]};
  border-radius: 4px;
  cursor: pointer;
  margin-left: auto;

  :visited,
  :active {
    color: ${COLORS.grey[500]};
  }
`;

export const LogoIcon = styled.div`
  position: absolute;
  left: 56px;
  transform: translateX(-50%);
  width: 200px;
  height: 64px;
  background-image: url(${({ theme }) => (theme?.themeType === 'light' ? DarkLogoSvg : LogoSvg)});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

export const LogoWrapper = styled.div`
  position: relative;
  width: 124px;
  height: 50px;
  overflow: hidden;
`;
