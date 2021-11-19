import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { IBlockType } from 'src/dal/blocks/interfaces';

import { BlocksTypesContainer } from '../container';

interface IParams {
  username: string;
  pageSlug: string;
}

const BlocksTypes = (props: any) => {
  const { push } = useHistory();
  const { username, pageSlug } = useParams<IParams>();

  // переходим на страницу формы создания блока с выбранным типом
  const onSelectBlockType = (blockType: IBlockType) =>
    push(`/profile/${username}/pages/${pageSlug}/blocks/${blockType.slug}/new/`);

  return <BlocksTypesContainer {...props} onSelectBlockType={onSelectBlockType} />;
};

export default BlocksTypes;
