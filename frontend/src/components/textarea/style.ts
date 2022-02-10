import styled, { css } from 'styled-components';
import Textarea from 'react-textarea-autosize';
import { COLORS } from 'src/components/theme';

export const TextareaWrapper = styled.div<{
  disabled?: boolean;
}>`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  max-width: 100%;

  & textarea {
    color: inherit;
    background-color: transparent;
    border: none;
    outline: none;
    width: 100%;
    font-size: 16px;
    font-family: 'Inter', sans-serif;
    resize: none;
    padding: 1px 2px;

    &::-ms-clear {
      display: none;
    }
    &::-ms-reveal {
      display: none;
    }

    &:-webkit-autofill {
      ${({ disabled }) => `
        box-shadow: ${disabled ? COLORS.grey[200] : COLORS.white} inset;
      `}
    }
    color: inherit !important;
    box-sizing: content-box;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const TextareaComponent = styled.div<{
  disabled?: boolean;
  error?: any;
  isFocused?: boolean;
  fontSizeInherit?: boolean;
}>`
  ${({ disabled, theme }) => css`
    background-color: ${disabled ? COLORS.grey[200] : theme?.background?.secondary};
  `}
  width: 100%;
  box-sizing: border-box;
  position: relative;
  font-weight: normal;
  min-height: 32px;
  display: flex;
  align-items: flex-end;
  padding: 6px 0;
  font-size: ${({ fontSizeInherit }) => (fontSizeInherit ? 'inherit' : '16px')};
`;

export const TextareaElementAutoresize = styled(Textarea)`
  box-sizing: border-box;
`;
