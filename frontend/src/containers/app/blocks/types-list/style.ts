import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const BlocksTypesContainerWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const TypeItem = styled(Link)`
  border: 1px solid black;
  padding: 10px 15px;
  cursor: pointer;
`;
