import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import qs from 'qs';

export function useQuery(defaultParams: any = {}) {
  const { search = '' } = useLocation();
  const [queryString] = useState(search.replace(/\?/g, ''));
  const [queryParams] = useState(qs.parse(queryString) || {});
  return {
    search,
    ...defaultParams,
    ...queryParams,
  };
}
