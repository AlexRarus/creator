import { useLocation } from 'react-router-dom';
import { isSsr } from 'src/utils/detectEnvironment';

export const useSsrComponentData = (staticContext: any) => {
  const { pathname } = useLocation();
  const ssrContext = isSsr ? staticContext : SSR_INITIAL_STATE;
  const isTargetUrl = pathname === ssrContext?.url;

  return isTargetUrl ? ssrContext.componentData : null;
};
