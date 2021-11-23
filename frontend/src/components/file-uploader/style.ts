import styled, { css } from 'styled-components';
import { COLORS, FONTS, defaultTheme, ITheme } from 'src/components/theme';
import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';
import GetAppIcon from '@mui/icons-material/GetApp';

interface IFileUploader {
  theme: ITheme;
  width?: string;
  progress?: number;
  isError?: boolean;
}

interface IFieldProps extends IFileUploader {
  isDragActive: boolean;
}

export const Wrapper = styled.div<IFileUploader>`
  width: auto;
  cursor: pointer;
  box-sizing: border-box;

  & svg {
    cursor: pointer;
  }
`;
Wrapper.defaultProps = {
  theme: defaultTheme,
};

export const Title = styled.div`
  color: ${COLORS.blue[400]};
  cursor: pointer;
  margin-left: 8px;
  display: flex;
  align-items: center;
`;

export const UploadContainer = styled.div`
  display: inline-flex;
`;

const hover = () => `
  background-color: rgba(101, 204, 123, 0.1);
  border: dashed 1px ${COLORS.green[400]};

  ${UploadContainer} {
    visibility: hidden;
  }
`;

export const Field = styled.div<IFieldProps>`
  display: flex;
  outline: none;
  ${({ isDragActive }: IFieldProps) => css`
    ${isDragActive ? hover() : ''}
  `}
  flex-direction: column;
`;
Field.defaultProps = {
  theme: defaultTheme,
};

export const Input = styled.input`
  display: none;
`;

export const Uploaded = styled.div<IFileUploader>`
  ${({ isError }: IFileUploader) => `
    background-color: ${isError ? COLORS.grey[100] : COLORS.white};
    color: ${isError ? COLORS.red[400] : COLORS.black};
    border-radius: 4px;
  `}

  padding: ${({ isError }) => (isError ? '0 12px' : '0')};
  margin-bottom: 16px;
  display: flex;
  align-items: center;

  :last-child {
    margin-bottom: 0;
  }
`;
Uploaded.defaultProps = {
  theme: defaultTheme,
};

export const Files = styled.div<IFileUploader>`
  font-size: 14px;
`;
Files.defaultProps = {
  theme: defaultTheme,
};

export const UploadedText = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${FONTS.InterStyle};
  font-size: 16px;
  color: ${COLORS.blueGrey[600]};
`;

export const UploadedIconCss = `
  margin-left: 14px;
  cursor: pointer;
  flex-shrink: 0;
`;

export const ErrorIconStyled = styled(ErrorIcon)`
  ${UploadedIconCss};
  font-size: 20px !important;
  color: ${COLORS.red[600]};
`;

export const CloseIconStyled = styled(CloseIcon)`
  ${UploadedIconCss};
  font-size: 24px !important;
  color: ${COLORS.grey[600]};
`;

export const GetAppIconStyled = styled(GetAppIcon)`
  font-size: 24px !important;
  color: ${COLORS.blue[400]};
`;

export const Error = styled.div<IFileUploader>`
  ${({ theme }: IFileUploader) => `
    font-size: 14px;
    line-height: 16px;
    color: ${COLORS.red[400]};
  `}
`;
Error.defaultProps = {
  theme: defaultTheme,
};

export const ErrorBlock = styled.div`
  margin-bottom: 16px;

  & ${Uploaded} {
    margin-bottom: 8px;
  }
`;

export const InformerWrapper = styled.div`
  margin-left: 8px;
`;
