import React, { Component } from 'react';
import { createPortal } from 'react-dom';

import { MobileActionsComponent } from './mobile-actions';
import { IProps } from './interfaces';

const WRAPPER_CLASSNAME = 'mobile-actions-wrapper';
const COMPONENT_CLASSNAME = 'mobile-actions-component';

export class MobileActions extends Component<IProps> {
  mobileActionsWrapper: HTMLDivElement;
  element: HTMLDivElement;

  constructor(props: any) {
    super(props);
    this.mobileActionsWrapper = document.querySelector(`.${WRAPPER_CLASSNAME}`) as HTMLDivElement;

    if (!this.mobileActionsWrapper) {
      this.mobileActionsWrapper = document.createElement('div');
      this.mobileActionsWrapper.classList.add(WRAPPER_CLASSNAME);
      document.body.append(this.mobileActionsWrapper);
    }

    this.element = document.createElement('div');
  }

  componentDidMount(): void {
    this.mobileActionsWrapper.append(this.element);
    this.element.classList.add(COMPONENT_CLASSNAME);

    document.body.classList.add('disable-scroll');
    document.documentElement.classList.add('disable-scroll');
  }

  componentWillUnmount(): void {
    this.element.remove();
    if (!this.mobileActionsWrapper.querySelector(`.${COMPONENT_CLASSNAME}`)) {
      document.body.classList.remove('disable-scroll');
      document.documentElement.classList.remove('disable-scroll');
    }
  }

  render() {
    return createPortal(<MobileActionsComponent {...this.props} />, this.element);
  }
}
