import React from 'react';
import { useParams } from 'react-router-dom';

import { BlocksFormContainer } from '../container';

interface IParams {
  username: string;
  pageSlug: string;
  blockType: string;
  blockId: string;
}

// страница создания блока для страницы, показываем на мобилке
const BlocksFormPage = (props: any) => {
  const params = useParams<IParams>();

  return <BlocksFormContainer {...props} {...params} />;
};

export default BlocksFormPage;
