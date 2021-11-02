import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { defaultTheme } from 'src/components/theme';

export const StyledButtonLink = styled(Link)`
  color: ${({ theme }) => theme.component.buttonLink.color.primary};
  font-weight: bold;
  text-decoration: none;

  :active {
    color: ${({ theme }) => theme.component.buttonLink.color.primary};
  }
  :visited {
    color: ${({ theme }) => theme.component.buttonLink.color.primary};
  }
`;
StyledButtonLink.defaultProps = {
  theme: defaultTheme,
};
