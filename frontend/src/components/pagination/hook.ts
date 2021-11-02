import { useEffect, useState } from 'react';
import { IOption } from 'src/components/button-select';

import { useLimitOptions, usePageOptions } from './utils';

export function usePagination(total = 0, limits = [20, 40, 60]) {
  const [totalPages, setTotalPages] = useState(1);
  const limitOptions = useLimitOptions(limits);
  const [limitOption, setLimitOption] = useState(limitOptions[0]);
  const pageOptions = usePageOptions(limitOption, totalPages);
  const [pageOption, setPageOption] = useState(pageOptions[0]);

  useEffect(() => {
    setTotalPages(Math.ceil(total / limitOption.value) || 1);
  }, [limitOption.value, total]);

  const onChangeLimit = (currentLimit: IOption) => {
    setLimitOption(currentLimit);
    setPageOption(pageOptions[0]);
  };
  const onChangePage = (currentPage: IOption) => {
    setPageOption(currentPage);
  };

  return {
    total,
    totalPages,
    limitOptions,
    limitOption,
    limit: limitOption.value,
    pageOptions,
    pageOption,
    offset: (pageOption.value - 1) * limitOption.value,
    onChangeLimit,
    onChangePage,
  };
}
