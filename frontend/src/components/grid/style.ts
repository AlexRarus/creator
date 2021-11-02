import styled, { css } from 'styled-components';
import { defaultTheme } from 'src/components/theme';
import { ITheme, TGridSize } from 'src/components/theme/interfaces';

import { IGridProps, IGridColumnProps } from './interfaces';
import { defaultBreakPoints } from './utils';

type TRow = TGridSize[];

const DEFAULT_GAP = 16;
const DEFAULT_VERTICAL_GAP = 32;

function sumArray(arr: number[]) {
  return arr.reduce((sum: number, item: number) => {
    sum += item;
    return sum;
  }, 0);
}

function getCalculateTemplateArea() {
  const memoizeBuffer: any = {};

  return function (sizeColumns: TGridSize[], size: TGridSize): TRow[] {
    const stringifyArgs = `cache-${sizeColumns.join('_')}__${size}`;
    if (!(stringifyArgs in memoizeBuffer)) {
      memoizeBuffer[stringifyArgs] = sizeColumns.reduce(
        (result: TRow[], columnSize: TGridSize) => {
          const currentRow: TRow = result[result.length - 1];
          const currentRowSize: number = sumArray(currentRow);
          const targetCompareValue: TGridSize = Math.min(size, columnSize) as TGridSize;

          if (currentRowSize + targetCompareValue > size) {
            result.push([targetCompareValue]);
          } else {
            currentRow.push(targetCompareValue);
          }

          return result;
        },
        [[]]
      );
    }
    return memoizeBuffer[stringifyArgs] as TRow[];
  };
}
const calculateTemplateArea = getCalculateTemplateArea();

function getAreaTemplateMemoize() {
  const memoizeBuffer: any = {};

  return function (rows: TRow[], maxSize: TGridSize, alignItems: string): string {
    const stringifyArgs = `cache-${rows.join('_').replace(' ', '_')}__${maxSize}`;
    if (!(stringifyArgs in memoizeBuffer)) {
      let columnIndex = 0;
      memoizeBuffer[stringifyArgs] = rows
        .map((row: TRow) => {
          let emptyColumns = maxSize;
          const templateRow: string[] = row.map((columnSize: TGridSize) => {
            columnIndex += 1;
            emptyColumns -= columnSize;
            return new Array(columnSize).fill(`column${columnIndex}`).join(' ');
          });
          const templateEmptyColumns = new Array(emptyColumns).fill('.');

          // если alignItems === 'end' то пустые колонки ставим вначале строки
          // иначе пустые колонки в конце строки
          const resultTemplateRow =
            alignItems === 'end'
              ? [...templateEmptyColumns, ...templateRow]
              : [...templateRow, ...templateEmptyColumns];
          return `"${resultTemplateRow.join(' ')}"`;
        })
        .join('\n');
    }
    return memoizeBuffer[stringifyArgs] as string;
  };
}
const areaTemplate = getAreaTemplateMemoize();

function getTemplate({
  theme,
  staticSize,
  breakPoints,
  sizeColumns,
  alignItems = 'start',
}: IGridProps) {
  const resultTheme: ITheme = {
    ...defaultTheme,
    ...theme,
  };
  const resultBreakPoints = breakPoints || {
    ...defaultBreakPoints,
    ...resultTheme.gridBreakPoints,
  };

  const DEFAULT_SIZE = staticSize || 12;
  const defaultRows: TRow[] = calculateTemplateArea(sizeColumns, DEFAULT_SIZE);

  const resultBreakPointsEntries = Object.entries(resultBreakPoints);
  resultBreakPointsEntries.sort((pointA: any[], pointB: any[]) => {
    return Number.parseInt(pointA[0]) > Number.parseInt(pointB[0]) ? -1 : 1;
  });
  const customMediaQueries = resultBreakPointsEntries.map(([breakPoint, size]) => {
    const numberSize = size as TGridSize;
    const rows: TRow[] = calculateTemplateArea(sizeColumns, staticSize || numberSize);

    return `
      @media (max-width: ${breakPoint}) {
        grid-template-columns: repeat(${staticSize || numberSize}, 1fr);
        grid-template-areas: ${areaTemplate(rows, staticSize || numberSize, alignItems)};
      }
    `;
  });

  return css`
    grid-template-columns: repeat(${DEFAULT_SIZE}, 1fr);
    grid-template-areas: ${areaTemplate(defaultRows, DEFAULT_SIZE, alignItems)};
    grid-auto-rows: auto;
    ${() => customMediaQueries}
  `;
}

export const GridColumn = styled.div<IGridColumnProps>`
  display: flex;
  flex-direction: ${({ direction = 'column' }) => direction};
  justify-content: ${({ justifyContent = 'flex-start' }) => justifyContent};
  align-items: ${({ alignItems = 'flex-start' }) => alignItems};
  grid-area: ${({ index }) => `column${index}`};
`;

export const Grid = styled.div<IGridProps>`
  display: grid;
  width: 100%;
  grid-column-gap: ${({ gap = DEFAULT_GAP }) => `${gap}px`};
  grid-row-gap: ${({ verticalGap = DEFAULT_VERTICAL_GAP }) => `${verticalGap}px`};
  ${getTemplate};
`;
Grid.defaultProps = {
  theme: defaultTheme,
};
