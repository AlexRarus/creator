import styled from 'styled-components';

export const FieldLabel = styled.div`
  font-size: 13px;
  height: 13px;
  color: ${({ theme }) => theme.textColor.secondary};
  transition: all 300ms;
  margin-bottom: 4px;
`;

export const PictureLabel = styled.div`
  text-align: center;
`;

export const PictureCell = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ItemFieldPictureShape = styled.div`
  grid-area: icon;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  min-width: 80px;
  height: 80px;
  min-height: 80px;
  border-radius: 6px;
  border: 1px dashed;
  overflow: hidden;
  cursor: pointer;
`;

export const PictureElement = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  :last-child {
    margin-bottom: 0;
  }
`;

export const BlockTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;
