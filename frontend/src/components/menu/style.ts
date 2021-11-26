import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { COLORS } from 'src/components/theme';

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
