import styled from 'styled-components';
import { COLORS } from 'src/components/theme';

export const BlockEditorContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const FormWrapper = styled.form`
  height: 100%;
  max-width: 100%;
  background: ${COLORS.white};
`;
