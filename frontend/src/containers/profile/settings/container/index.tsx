import React from 'react';
import { observer } from 'mobx-react';
import { Navigate } from 'react-router-dom';

import { AvatarBlock } from './avatar-block';
import { AccountDataBlock } from './account-data-block';
import { useMapStoreToProps } from './selectors';
import { SettingsWrapper } from './style';

interface IProps {
  username: string;
}

export const SettingsContainer = observer((props: IProps) => {
  const { isLoading, user, selectedPage } = useMapStoreToProps();
  const { username } = props;

  if (user && user?.username !== username) {
    return <Navigate to={`/profile/${user?.username}/settings/`} replace={true} />;
  }

  return (
    <SettingsWrapper>
      {isLoading && 'Loading...'}
      {!isLoading && user && (
        <>
          <AvatarBlock user={user} />
          <AccountDataBlock user={user} selectedPage={selectedPage} />
        </>
      )}
    </SettingsWrapper>
  );
});
