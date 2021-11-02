import { LazyExoticComponent, ComponentType, ReactNode } from 'react';

interface IExtraProps {
  [key: string]: any;
}

export interface IRoute {
  path: string;
  component?: LazyExoticComponent<ComponentType<any>>;
  componentExtraProps?: IExtraProps;
  // Preloader for lazy loading
  fallback?: NonNullable<ReactNode> | null;
  // Redirect path
  redirect?: string;
  // Sub profileRoutes
  routes?: IRoute[];
  exact?: boolean;
  params?: any;
}
