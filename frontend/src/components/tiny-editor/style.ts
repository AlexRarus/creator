import styled from 'styled-components';

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
