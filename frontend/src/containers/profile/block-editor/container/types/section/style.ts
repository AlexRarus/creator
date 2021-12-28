import styled from 'styled-components';
import { ITheme } from 'src/dal/themes/interfaces';
import { getUserThemeStyles } from 'src/dal/themes/style';

export const SectionFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  flex-grow: 1;
`;

export const MicroRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const MicroLabel = styled.div`
  margin-right: 4px;
`;

export const Label = styled.div`
  margin-bottom: 4px;
`;

export const MicroPostfix = styled.div`
  margin-left: 4px;
`;

export const MicroInputWrapper = styled.div`
  width: 64px;
  margin-left: auto;
`;

export const BackgroundPreview = styled.div<{ selectedTheme?: ITheme | null }>`
  padding: 20px;
  min-height: 120px;
  width: 100%;
  border: 1px solid;
  ${({ selectedTheme }) => getUserThemeStyles(selectedTheme)};
`;

export const RangeLabel = styled.div`
  margin-right: 4px;
  align-self: baseline;
`;

export const ItemFieldPictureShape = styled.div`
  grid-area: icon;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 6px;
  border: 1px dashed;
  overflow: hidden;
  cursor: pointer;
`;

export const PictureElement = styled.img`
  max-width: 100%;
  max-height: 100%;
`;
