import React from 'react';
import Modal, { MobileSize } from 'src/components/modal';

import { PagesListContainer } from './container';

interface IProps {
  onClose(): void;
  username: string;
  pageSlug: string;
}

export const PagesListModal = (props: IProps) => {
  const { onClose, username, pageSlug } = props;

  return (
    <Modal onClose={onClose} title='Ваши страницы' mobileSize={MobileSize.L}>
      <PagesListContainer username={username} pageSlug={pageSlug} />
    </Modal>
  );
};
