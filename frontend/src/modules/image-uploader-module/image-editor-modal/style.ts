import styled from 'styled-components';
import { LIGHT_THEME } from 'src/components/theme';

export const AvatarEditorWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  background: ${({ theme }) => theme.background.primary};
`;
AvatarEditorWrapper.defaultProps = {
  theme: LIGHT_THEME,
};

export const ControlsWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const FormRow = styled.div`
  margin: 10px 0;
`;
