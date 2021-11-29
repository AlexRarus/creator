import styled, { css } from 'styled-components';

export const TinyEditorStyles = css`
  html {
    color: ${({ theme }) => theme?.textColor?.primary} !important;
    fill: ${({ theme }) => theme?.textColor?.primary};
  }
`;

export const TinyWrapper = styled.div`
  width: 100%;
  div * {
    background: inherit !important;
    color: ${({ theme }) => theme?.textColor?.primary} !important;
    fill: ${({ theme }) => theme?.textColor?.primary};
  }

  .tox-tinymce {
    border: none;
  }
  .tox-editor-header {
    border: 1px solid ${({ theme }) => theme?.component?.button?.borderColor?.secondary} !important;
    color: inherit !important;
    border-radius: 8px !important;
    padding: 4px 6px !important;
  }

  #tinymce {
    color: ${({ theme }) => theme?.textColor?.primary} !important;
    fill: ${({ theme }) => theme?.textColor?.primary};
  }
`;

export const InnerHTMLBlockByTinyEditor = styled.div`
  max-width: 100%;

  *:focus {
    outline: none;
  }

  table {
    tr {
      td {
        padding: 8px 10px;
      }
    }
  }

  p,
  ul,
  ol,
  li,
  div {
    border: none !important;
    outline: none !important;
  }

  img {
    max-width: 100% !important;
    object-fit: contain;
  }

  :after {
    display: block;
    content: '';
    clear: both;
  }
`;
