import { useLocation } from 'react-router-dom';
import { isSsr } from 'src/utils/detectEnvironment';
import { useStaticContext } from 'src/providers/static-context-provider';

export const useSsrComponentData = () => {
  const { pathname } = useLocation();
  const staticContext = useStaticContext();
  const ssrContext = isSsr ? staticContext : SSR_INITIAL_STATE;
  const isTargetUrl = pathname === ssrContext?.url;

  return isTargetUrl ? ssrContext.componentData : null;
};
