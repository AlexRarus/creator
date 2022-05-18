import { LazyExoticComponent, ComponentType } from 'react';

export interface IRoute {
  path: string;
  Component?: LazyExoticComponent<ComponentType<any>> | ComponentType<any>;
  index?: boolean;
}
