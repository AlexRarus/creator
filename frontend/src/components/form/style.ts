import styled from 'styled-components';
import { rgba, lighten } from 'polished';

export const FormWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const FormBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
`;

// TODO 51 чтобы перебить zIndex color-picker
export const FormFooter = styled.div`
  z-index: 51;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  width: 100%;
  justify-content: flex-end;
  position: sticky;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    ${({ theme }) => rgba(theme?.background?.primary, 0)} 0,
    ${({ theme }) => lighten(0.04, theme?.background?.primary)} 30%
  );
  border-radius: 0 0 8px 8px;
`;
