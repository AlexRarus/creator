import styled from 'styled-components';
import { COLORS } from 'src/components/theme';
import { rgba } from 'polished';
import { Actions } from 'src/components/actions';

export const SwiperWrapper = styled.div`
  width: 100%;
`;

export const TemplatePreviewWrapper = styled.div`
  position: relative;
`;

export const TemplatePreviewItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-decoration: none;
  user-select: none;
  cursor: pointer;
  overflow: hidden;
`;

export const DeviceOuter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  width: 270px;
  height: 520px;
  max-width: calc(100vw - 20px);
  max-height: calc(100vh - 20px);
  padding: 5px;
  overflow: hidden;
  overflow-y: auto;
  border: 10px solid ${COLORS.grey[500]};
  border-radius: 25px;
  box-shadow: 0 0 4px ${rgba(COLORS.black, 0.2)};
  background: ${COLORS.white};
  transition: all 200ms ease-out;
  position: relative;

  :hover {
    border: 10px solid ${COLORS.grey[500]};
    box-shadow: 0 0 4px ${rgba(COLORS.blue[500], 0.2)};
  }
`;

export const DeviceInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  border-radius: 25px;
  background: ${COLORS.white};
`;

export const DeviceActions = styled(Actions)`
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const BlockMock = styled.div<{ isSection: boolean }>`
  width: 100%;
  padding-bottom: 15px;
  padding-left: ${({ isSection }) => (isSection ? 0 : '10px')};
  padding-right: ${({ isSection }) => (isSection ? 0 : '10px')};

  :first-child {
    padding-top: 30px;
  }

  :last-child {
    padding-bottom: 80px;
  }

  & > & {
    //  блоки внутри секций
    padding-bottom: 5px;

    :first-child {
      padding-top: 10px;
    }

    :last-child {
      padding-bottom: 10px;
    }
  }
`;
