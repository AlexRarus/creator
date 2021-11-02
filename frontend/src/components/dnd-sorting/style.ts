import styled from 'styled-components';

export const SortingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  width: 100%;
  min-width: 100%;
`;

export const SortingLabel = styled.div`
  font-size: 20px;
  font-weight: bold;
  height: 25px;
`;

export const SortingOptions = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export const SortedItem = styled.div`
  width: 100%;
  cursor: move;
  margin-bottom: 5px;

  :last-child {
    margin-bottom: 0;
  }
`;

export const SearchingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  width: 100%;
  min-width: 100%;
`;

export const SearchingOptions = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;
