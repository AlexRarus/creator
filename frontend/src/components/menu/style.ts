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
  top: 50%;
  left: 40px;
  transform: translate(-50%, -50%);
  width: 140px;
  height: 46px;
  background-image: url(${({ theme }) => (theme?.themeType === 'light' ? DarkLogoSvg : LogoSvg)});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

export const LogoWrapper = styled.div`
  position: relative;
  width: 88px;
  height: 36px;
  overflow: hidden;
`;
