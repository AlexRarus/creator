import styled from 'styled-components';
import { MEDIA } from 'src/components/theme';

export const TemplatesListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 10px;
`;

export const TemplatesListTitleDesktop = styled.div`
  padding: 0 10px;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  display: flex;

  ${MEDIA.max530({
    display: 'none',
  })}
`;

export const SwiperWrapper = styled.div`
  width: 100%;
`;

export const NewTemplateButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  user-select: none;
  cursor: pointer;
  overflow: hidden;
  margin-top: 16px;
`;
