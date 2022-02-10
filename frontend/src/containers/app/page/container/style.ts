import styled from 'styled-components';
import { ITheme } from 'src/dal/themes/interfaces';
import { getUserThemeStyles } from 'src/dal/themes/style';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: auto;
`;

// позиционирование блока на странице
export const BlockPositioning = styled.div<{ isSection?: boolean }>`
  width: 100%;
  padding-bottom: 15px;
  padding-left: ${({ isSection }) => (isSection ? 0 : '10px')};
  padding-right: ${({ isSection }) => (isSection ? 0 : '10px')};

  :first-child {
    padding-top: 30px;
  }

  :last-child {
    padding-bottom: 80px;
  }

  & > & {
    //  блоки внутри секций
    padding-bottom: 5px;

    :first-child {
      padding-top: 10px;
    }

    :last-child {
      padding-bottom: 10px;
    }
  }
`;
