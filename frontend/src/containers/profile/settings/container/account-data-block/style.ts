import styled from 'styled-components';
import { COLORS, MEDIA } from 'src/components/theme';

export const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-gap: 15px;
  width: 100%;
  max-height: 600px;
  padding: 15px;
`;

export const DataWithDescriptionWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  width: 100%;

  ${MEDIA.max768({
    gridGap: '10px',
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto auto',
  })};
`;

export const AccountDataDescription = styled.div`
  font-size: 14px;
  line-height: 18px;
  margin-top: 20px;
  color: ${COLORS.grey[500]};

  ${MEDIA.max768({
    marginTop: '0',
  })};
`;

export const PageUrlExampleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  background: ${COLORS.grey[900]};
  padding: 5px 8px;
  border-radius: 2px;
  width: fit-content;
`;

export const UrlDomain = styled.div`
  color: ${COLORS.white};
`;

export const UrlUsername = styled.div`
  color: ${COLORS.deepOrange[600]};
`;

export const UrlPageSlug = styled.div`
  color: ${COLORS.blue[600]};
`;
