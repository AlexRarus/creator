import React from 'react';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';

import { AvatarBlock } from './avatar-block';
import { AccountDataBlock } from './account-data-block';
import { useMapStoreToProps } from './selectors';
import { SettingsWrapper } from './style';

interface IProps {
  username: string;
}

export const SettingsContainer = observer((props: IProps) => {
  const { isLoading, user, getMeAction } = useMapStoreToProps();
  const { username } = props;

  if (user && user?.username !== username) {
    return <Redirect to={`/profile/${user?.username}/settings/`} />;
  }

  const onSuccessChangeAvatar = () => {
    getMeAction();
  };

  return (
    <SettingsWrapper>
      {isLoading && 'Loading...'}
      {!isLoading && user && (
        <>
          <AvatarBlock user={user} onSuccessChange={onSuccessChangeAvatar} />
          <AccountDataBlock user={user} />
        </>
      )}
    </SettingsWrapper>
  );
});