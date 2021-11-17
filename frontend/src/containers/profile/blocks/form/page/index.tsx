import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { BlocksFormContainer } from '../container';

interface IParams {
  username: string;
  pageSlug: string;
  blockType: string;
  blockId: string;
}

// страница создания блока для страницы, показываем на мобилке
const BlocksFormPage = (props: any) => {
  const { push } = useHistory();
  const params = useParams<IParams>();
  const { username, pageSlug } = params;
  const onSuccess = () => {
    console.log('onSuccess from PAGE');
    push(`/profile/${username}/pages/${pageSlug}/`);
  };
  const onCancel = () => {
    console.log('onCancel from PAGE');
    push(`/profile/${username}/pages/${pageSlug}/`);
  };

  return <BlocksFormContainer {...props} {...params} onSuccess={onSuccess} onCancel={onCancel} />;
};

export default BlocksFormPage;
