import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IUser } from 'src/dal/auth/interfaces';
import { IPage } from 'src/dal/pages/interfaces';

import { BlockWrapper, BlockHeader, BlockTitle, BlockDescription, BlockContent } from '../style';

import { AccountDataField } from './account-data-field';
import { PageUrlExample } from './page-url-example';
import { ChangeEmailModal } from './modals/change-email-modal';
import { ChangeUsernameModal } from './modals/change-username-modal';
import { ChangePasswordModal } from './modals/change-password-modal';
import { ContentWrapper, DataWithDescriptionWrapper, AccountDataDescription } from './style';

interface IProps {
  user: IUser;
  selectedPage: IPage | null;
}

export const AccountDataBlock = (props: IProps) => {
  const { user, selectedPage } = props;
  const { replace } = useHistory();
  const [isOpenChangeEmail, setIsOpenChangeEmail] = useState(false);
  const [isOpenChangeUsername, setIsOpenChangeUsername] = useState(false);
  const [isOpenChangePassword, setIsOpenChangePassword] = useState(false);

  const openChangeEmailModal = () => setIsOpenChangeEmail(true);
  const openChangeUsernameModal = () => setIsOpenChangeUsername(true);
  const openChangePasswordModal = () => setIsOpenChangePassword(true);

  const closeChangeEmailModal = () => setIsOpenChangeEmail(false);
  const closeChangeUsernameModal = () => setIsOpenChangeUsername(false);
  const closeChangePasswordModal = () => setIsOpenChangePassword(false);

  const onSuccessSubmitEmail = (data: any) => console.log('onSuccessSubmitEmail', data);
  const onSuccessSubmitUsername = (data: any) => {
    replace(`/profile/${data.username}/settings/`);
  };
  const onSuccessSubmitPassword = (data: any) => console.log('onSuccessSubmitPassword', data);

  return (
    <BlockWrapper>
      <BlockHeader>
        <BlockTitle>Данные аккаунта</BlockTitle>
        <BlockDescription>
          Вы можете изменить свою электронную почту, пароль и другие данные
        </BlockDescription>
      </BlockHeader>
      <BlockContent>
        <ContentWrapper>
          <DataWithDescriptionWrapper>
            <AccountDataField
              label='Электронная почта'
              value={user?.email}
              onClick={openChangeEmailModal}
            />
            <AccountDataDescription>
              Электронная почта используется для входа в аккаунт, а так же для восстановления
              пароля.
            </AccountDataDescription>
          </DataWithDescriptionWrapper>
          <DataWithDescriptionWrapper>
            <AccountDataField
              label='Имя пользователя'
              value={user?.username}
              onClick={openChangeUsernameModal}
            />
            <AccountDataDescription>
              Имя пользователя учавствует в формировании ссылок на все созданные вами страницы,
              например: <PageUrlExample user={user} selectedPage={selectedPage} />
            </AccountDataDescription>
          </DataWithDescriptionWrapper>
          <DataWithDescriptionWrapper>
            <AccountDataField
              label='Пароль'
              value='******'
              type='password'
              onClick={openChangePasswordModal}
            />
            <AccountDataDescription>Пароль используется для входа в акаунт.</AccountDataDescription>
          </DataWithDescriptionWrapper>
        </ContentWrapper>
      </BlockContent>
      {isOpenChangeEmail && (
        <ChangeEmailModal
          onClose={closeChangeEmailModal}
          onSuccess={onSuccessSubmitEmail}
          user={user}
        />
      )}
      {isOpenChangeUsername && (
        <ChangeUsernameModal
          onClose={closeChangeUsernameModal}
          onSuccess={onSuccessSubmitUsername}
          user={user}
        />
      )}
      {isOpenChangePassword && (
        <ChangePasswordModal
          onClose={closeChangePasswordModal}
          onSuccess={onSuccessSubmitPassword}
        />
      )}
    </BlockWrapper>
  );
};
