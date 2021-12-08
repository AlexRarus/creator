import styled from 'styled-components';
import { ITheme } from 'src/dal/themes/interface';

export const SectionFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-grow: 1;
`;

export const Label = styled.div`
  font-size: 12px;
  margin-bottom: 4px;
`;

export const MicroRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const MicroLabel = styled.div`
  margin-right: 4px;
`;

export const MicroPostfix = styled.div`
  margin-left: 4px;
`;

export const MicroInputWrapper = styled.div`
  width: 64px;
  margin-left: auto;
`;

export const BackgroundPreview = styled.div<{ selectedTheme: ITheme | null }>`
  padding: 20px;
  min-height: 120px;
  width: 100%;
  border: 1px solid;
  background: ${({ selectedTheme }) => selectedTheme?.background || 'inherit'};
  color: ${({ selectedTheme }) => selectedTheme?.color || 'inherit'};
`;

export const RangeLabel = styled.div`
  margin-right: 4px;
  align-self: baseline;
`;
