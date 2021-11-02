import React, { useState } from 'react';
import { Tooltip } from 'src/components/tooltip';

import { IColumn, IRow } from '../interfaces';
import defaultStringifyValue from '../utils/defaultStringifyValue';

import { DefaultCellValue, DefaultCellValueWrapper } from './style';

interface ICellValueProps<TRowData> {
  column: IColumn;
  row: IRow<TRowData>;
  isExpand: boolean;
  tooltipValue?: string[];
  cellValueStringify?(column: IColumn, row: IRow<any>): string;
}

export function DefaultCell<TRowData>(props: ICellValueProps<TRowData>) {
  const [openerElement, openerRefCallback] = useState<HTMLElement | null>(null);
  const { column, row, isExpand, cellValueStringify, tooltipValue } = props;
  const { hasTooltip, isResetStyleColumn } = column;

  const stringValue = cellValueStringify
    ? cellValueStringify(column, row)
    : defaultStringifyValue(column, row);

  return (
    <DefaultCellValueWrapper hasTooltip={hasTooltip} isResetStyleColumn={isResetStyleColumn}>
      {hasTooltip ? (
        <DefaultCellValue ref={openerRefCallback}>
          {stringValue}
          <Tooltip openerElement={openerElement} position='bottom'>
            {tooltipValue && tooltipValue.length
              ? tooltipValue.map((v, index) => <div key={index}>{v}</div>)
              : stringValue}
          </Tooltip>
        </DefaultCellValue>
      ) : (
        <DefaultCellValue isExpand={isExpand}>{stringValue}</DefaultCellValue>
      )}
    </DefaultCellValueWrapper>
  );
}
