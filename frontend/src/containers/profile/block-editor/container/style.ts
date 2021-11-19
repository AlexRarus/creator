import styled from 'styled-components';
import { COLORS } from 'src/components/theme';

export const BlocksFormContainerWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const FormWrapper = styled.form`
  max-width: 100%;
`;

export const FormTitle = styled.div`
  font-size: 28px;
  line-height: 32px;
  margin-bottom: 32px;
  color: ${COLORS.grey[800]};
`;
