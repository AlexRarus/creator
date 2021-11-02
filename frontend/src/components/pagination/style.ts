import styled from 'styled-components';
import { COLORS } from 'src/components/theme';
import ButtonSelect from 'src/components/button-select';

export const PaginationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

const Block = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 10px;
  padding-right: 10px;
  border-right: 1px solid ${COLORS.grey[200]};

  :last-child {
    margin-right: 0;
    padding-right: 0;
    border-right: none;
  }
`;

export const LimitBlock = styled(Block)``;

export const CurrentPageBlock = styled(Block)``;

export const OffsetBlock = styled(Block)``;

export const Label = styled.div``;

export const ButtonSelectStyled = styled(ButtonSelect)`
  border: none;
  color: ${COLORS.black};

  svg {
    fill: ${COLORS.black};
  }
`;
