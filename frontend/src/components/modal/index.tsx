import React, { Component } from 'react';
import { createPortal } from 'react-dom';

import Modal from './modal';
import { IProps } from './interfaces';
export type { IProps } from './interfaces';
export { MobileSize, DesktopSize } from './interfaces';

export default class ModalComponent extends Component<IProps> {
  modalsWrapper: HTMLDivElement;
  element: HTMLDivElement;

  constructor(props: IProps) {
    super(props);
    this.modalsWrapper = document.querySelector('.modals-wrapper') as HTMLDivElement;

    if (!this.modalsWrapper) {
      this.modalsWrapper = document.createElement('div');
      this.modalsWrapper.classList.add('modals-wrapper');
      document.body.append(this.modalsWrapper);
    }

    this.element = document.createElement('div');
  }

  componentDidMount(): void {
    this.modalsWrapper.append(this.element);
    this.element.classList.add('modal-component-wrapper');

    document.body.classList.add('disable-scroll');
    document.documentElement.classList.add('disable-scroll');
  }

  componentWillUnmount(): void {
    this.element.remove();
    if (!this.modalsWrapper.querySelector('.modal-component-wrapper')) {
      document.body.classList.remove('disable-scroll');
      document.documentElement.classList.remove('disable-scroll');
    }
  }

  render() {
    return createPortal(<Modal {...this.props} />, this.element);
  }
}
