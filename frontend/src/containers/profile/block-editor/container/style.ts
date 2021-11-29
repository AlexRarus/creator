import styled from 'styled-components';

export const BlockEditorContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const FormWrapper = styled.form`
  max-width: 100%;
  background: ${({ theme }) => theme?.background?.primary};
`;
