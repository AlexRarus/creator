import { useEffect, useState } from 'react';
import { IOption } from 'src/components/button-select';

export function useLimitOptions(limits: number[]): IOption[] {
  const [limitsOptions, setLimitsOptions] = useState<IOption[]>(
    limits.map((limit: number) => ({
      value: limit,
      label: limit,
    }))
  );

  useEffect(() => {
    setLimitsOptions(
      limits.map((limit: number) => ({
        value: limit,
        label: limit,
      }))
    );
  }, [JSON.stringify(limits)]);

  return limitsOptions;
}

export function usePageOptions(limitOption: IOption, totalPages = 1): IOption[] {
  const [pagesOptions, setPagesOptions] = useState<IOption[]>(
    Array(totalPages)
      .fill(null)
      .map((_, index) => ({
        value: index + 1,
        label: index + 1,
      }))
  );

  useEffect(() => {
    setPagesOptions(
      Array(totalPages)
        .fill(null)
        .map((_, index) => ({
          value: index + 1,
          label: index + 1,
        }))
    );
  }, [totalPages]);

  return pagesOptions;
}
