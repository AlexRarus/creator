import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)<{
  color?: string;
}>`
  color: ${({ color, theme }) => color || theme.component.link.color.primary};
  font-weight: normal;
  text-decoration: none;

  :visited {
    color: ${({ color, theme }) => color || theme.component.link.color.primary};
  }
  :hover {
    color: ${({ theme }) => theme.component.link.color.secondary};
  }
  :active {
    color: ${({ theme }) => theme.component.link.color.secondary};
  }
`;
