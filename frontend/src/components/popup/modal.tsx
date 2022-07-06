import React, { Component } from 'react';
import { createPortal } from 'react-dom';

import { ModalWrapper } from './style';

interface IProps {
  children: any;
  cssClass?: string;
}

export default class Modal extends Component<IProps> {
  element: HTMLDivElement;

  constructor(props: IProps) {
    super(props);

    this.element = document.createElement('div');
    this.element.classList.add(props?.cssClass || 'popup-component-wrapper');
    document.body.append(this.element);
  }

  componentWillUnmount(): void {
    this.element.remove();
  }

  render() {
    return createPortal(<ModalWrapper>{this.props.children}</ModalWrapper>, this.element);
  }
}
