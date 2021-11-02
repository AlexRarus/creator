import React, { Component } from 'react';
import { createPortal } from 'react-dom';

import { ModalWrapper } from './style';

interface IProps {
  children: any;
}

export default class Modal extends Component<IProps> {
  element: HTMLDivElement;

  constructor(props: IProps) {
    super(props);

    this.element = document.createElement('div');
    this.element.classList.add('popup-component-wrapper-2');
    document.body.append(this.element);
  }

  componentWillUnmount(): void {
    this.element.remove();
  }

  render() {
    return createPortal(<ModalWrapper>{this.props.children}</ModalWrapper>, this.element);
  }
}
