import React, { Component, GetDerivedStateFromProps } from 'react';
import { createPortal } from 'react-dom';

import Modal from './modal';
import { IProps, IState, ModalSize } from './interfaces';
export { ModalSize } from './interfaces';

export default class ModalComponent extends Component<IProps, IState> {
  modalsWrapper: HTMLDivElement;
  element: HTMLDivElement;

  static defaultProps = {
    hasHeader: true,
    hasCloseButton: true,
    isCenter: true,
    isPadding: true,
    size: ModalSize.MIDDLE,
  };

  state = {
    padding: {
      top: 24,
      right: 32,
      bottom: 24,
      left: 32,
    },
  };

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

  // такой формат типизации обязателен
  public static getDerivedStateFromProps: GetDerivedStateFromProps<IProps, IState> = (
    nextProps: IProps,
    prevState: IState
  ) => {
    if (nextProps && nextProps.padding) {
      return {
        ...nextProps,
        padding: {
          ...prevState.padding,
          ...nextProps.padding,
        },
      };
    }

    return nextProps;
  };

  componentDidMount(): void {
    this.modalsWrapper.append(this.element);
    this.element.classList.add('modal-component-wrapper');

    document.body.classList.add('disable-scroll');
  }

  componentWillUnmount(): void {
    this.element.remove();
    if (!this.modalsWrapper.querySelector('.modal-component-wrapper')) {
      document.body.classList.remove('disable-scroll');
    }
  }

  render() {
    return createPortal(<Modal {...this.props} {...this.state} />, this.element);
  }
}
