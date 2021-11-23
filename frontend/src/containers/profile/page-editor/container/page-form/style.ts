import styled from 'styled-components';
import { COLORS, MEDIA } from 'src/components/theme';

export const FORM_HEADER_HEIGHT = 64;
export const FORM_FOOTER_HEIGHT = 64;

const PAGE_PREVIEW_PADDING = 24;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  padding: ${PAGE_PREVIEW_PADDING}px;
`;

export const FormHeader = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: ${FORM_HEADER_HEIGHT}px;
  width: 100%;
  background: ${COLORS.grey[800]};
  display: flex;
  flex-direction: row;
  padding: 10px;
  justify-content: space-between;
  align-items: center;

  ${MEDIA.max530({
    position: 'relative',
  })}
`;

export const HeaderMessage = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${COLORS.grey[400]};
  font-size: 16px;

  svg {
    margin-left: 5px;
    fill: ${COLORS.grey[400]};
  }
`;

export const FormFooter = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  height: ${FORM_FOOTER_HEIGHT}px;
  width: 100%;
  background: ${COLORS.grey[800]};
  color: ${COLORS.white};
  display: flex;
  flex-direction: row;

  ${MEDIA.max530({
    position: 'fixed',
  })}
`;

export const IconButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${FORM_FOOTER_HEIGHT}px;
  height: ${FORM_FOOTER_HEIGHT}px;

  svg {
    fill: ${COLORS.grey[300]};

    :hover {
      fill: ${COLORS.grey[100]};
    }
  }
`;

export const AddBlockButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  height: 100%;
  padding: 5px;
  border-left: 1px solid ${COLORS.grey[500]};
  border-right: 1px solid ${COLORS.grey[500]};
`;
