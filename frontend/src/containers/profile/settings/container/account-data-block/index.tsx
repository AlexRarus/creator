import React from 'react';
import { IUser } from 'src/dal/auth/interfaces';

import { BlockWrapper, BlockHeader, BlockTitle, BlockDescription, BlockContent } from '../style';

interface IProps {
  user: IUser;
}

export const AccountDataBlock = (props: IProps) => {
  return (
    <BlockWrapper>
      <BlockHeader>
        <BlockTitle>Данные аккаунта</BlockTitle>
        <BlockDescription>
          Вы можете изменить свою электронную почту, пароль и другие данные
        </BlockDescription>
      </BlockHeader>
      <BlockContent>email</BlockContent>
    </BlockWrapper>
  );
};
