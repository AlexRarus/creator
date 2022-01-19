import styled from 'styled-components';
import ButtonSelect from 'src/components/button-select';

export const ListFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-grow: 1;
`;

export const ListEditModuleWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BaseControlsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid ${({ theme }) => theme?.borderColor?.secondary};
  width: 100%;
  padding: 10px;
`;

export const StyledButtonSelect = styled(ButtonSelect)`
  margin-right: 16px;
`;
