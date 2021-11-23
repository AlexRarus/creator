import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { COLORS } from 'src/components/theme';
import { rgba } from 'polished';

export const PagesListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PagePreviewItemWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-decoration: none;
  user-select: none;
  cursor: pointer;
  overflow: hidden;
`;

export const PageContentPreview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  width: 120px;
  height: 190px;
  padding: 5px;
  overflow: hidden;
  border: 1px solid ${COLORS.black};
  border-radius: 4px;
  box-shadow: 0 0 4px ${rgba(COLORS.black, 0.2)};
  background: ${COLORS.white};
`;

export const PageLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${COLORS.grey[600]};
  margin-top: 3px;
`;

export const BlockMock = styled.div`
  width: 100%;
  height: 15px;
  background: ${COLORS.grey[300]};
  border-radius: 2px;
  margin-bottom: 5px;

  :last-child {
    margin-bottom: 0;
  }
`;

export const NewPageButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  width: 120px;
  height: 190px;
  padding: 5px;
  overflow: hidden;
  border: 2px dashed ${COLORS.grey[400]};
  border-radius: 4px;
  box-shadow: 0 0 4px ${rgba(COLORS.black, 0.2)};
  background: ${COLORS.white};

  svg {
    fill: ${COLORS.grey[400]};
    width: 40px;
    height: 40px;
  }
`;
