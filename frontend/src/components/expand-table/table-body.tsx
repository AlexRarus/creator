import React, { ReactNode, useEffect, useState } from 'react';

import useScrollReachEndTable from './utils/useScrollReachEndTable';
import { TableBody } from './style';

interface ITableBodyProps {
  children: ReactNode;
  isLoadingData?: boolean;
  canScroll?: boolean;
  onReachEnd?(): void;
  refreshKey?: string;
  minHeight?: string;
}

export default function TableBodyComponent(props: ITableBodyProps) {
  const { children, isLoadingData, onReachEnd, canScroll, refreshKey, minHeight } = props;
  const [tableBodyElement, tableBodyRefCallback] = useState<HTMLElement | null>(null);
  const isReach: boolean = useScrollReachEndTable(tableBodyElement, {
    isLoading: Boolean(isLoadingData),
    refreshKey,
  });

  useEffect(() => {
    if (isReach) {
      onReachEnd && onReachEnd();
    }
  }, [isReach]);

  return (
    <TableBody ref={tableBodyRefCallback} canScroll={canScroll} minHeight={minHeight}>
      {children}
    </TableBody>
  );
}
