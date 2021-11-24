import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { COLORS, MEDIA } from 'src/components/theme';
import { rgba } from 'polished';

export const PagesListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

export const PagesListTitleDesktop = styled.div`
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  display: flex;

  ${MEDIA.max530({
    display: 'none',
  })}
`;

export const PageLabel = styled.div`
  width: 110px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: center;
  cursor: pointer;
  color: ${COLORS.grey[600]};
  margin-top: 3px;
  transition: all 200ms ease-out;
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

  :hover {
    ${PageLabel} {
      color: ${COLORS.blue[500]};
    }
  }
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
  border: 1px solid ${COLORS.grey[500]};
  border-radius: 4px;
  box-shadow: 0 0 4px ${rgba(COLORS.black, 0.2)};
  background: ${COLORS.white};
  transition: all 200ms ease-out;

  :hover {
    border: 1px solid ${COLORS.blue[500]};
    box-shadow: 0 0 4px ${rgba(COLORS.blue[500], 0.2)};
  }
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

export const NewPageButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  user-select: none;
  cursor: pointer;
  overflow: hidden;

  :hover {
    ${PageLabel} {
      color: ${COLORS.blue[500]};
    }
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
  transition: all 200ms ease-out;

  svg {
    fill: ${COLORS.grey[400]};
    width: 40px;
    height: 40px;
  }

  :hover {
    border: 2px dashed ${COLORS.blue[500]};
    box-shadow: 0 0 4px ${rgba(COLORS.blue[500], 0.2)};

    svg {
      fill: ${COLORS.blue[500]};
    }
  }
`;
