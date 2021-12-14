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

export const FileUploaderField = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px;
`;

export const FileUploaderLabel = styled.div`
  display: flex;
  align-items: center;
  margin-right: 5px;
`;

export const FormRow = styled.div`
  margin: 10px 0;
`;
