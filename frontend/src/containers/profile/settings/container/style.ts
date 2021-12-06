import styled from 'styled-components';
import { COLORS, MEDIA } from 'src/components/theme';

export const SettingsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 20px;

  ${MEDIA.max768({
    padding: '15px 10px',
  })}
`;

export const BlockWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 30% 1fr;
  gap: 30px;
  padding: 15px 0;
  border-top: 1px solid ${COLORS.grey[300]};
  border-bottom: 1px solid ${COLORS.grey[400]};

  :first-child {
    border-top: none;
    padding-top: 0;
  }

  :last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  ${MEDIA.max768({
    gridTemplateRows: 'auto auto',
    gridTemplateColumns: '1fr',
    gap: '0px',
    padding: '10px 0',
    border: 'none',
  })}
`;

export const BlockHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BlockTitle = styled.div`
  font-size: 32px;

  ${MEDIA.max768({
    fontSize: '28px',
  })}
`;

export const BlockDescription = styled.div`
  font-size: 14px;
  line-height: 18px;
  margin: 10px 0 5px;
  color: ${COLORS.grey[500]};
`;

export const BlockContent = styled.div`
  background: ${COLORS.white};
  border: 1px solid ${COLORS.grey[300]};
  border-radius: 2px;

  ${MEDIA.max768({
    fontSize: '28px',
  })}
`;
