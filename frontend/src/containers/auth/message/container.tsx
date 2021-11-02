import React from 'react';
import { observer } from 'mobx-react';
import { Grid, GridColumn } from 'src/components/grid';
import { useQuery } from 'src/hooks/useQuery';
import { useTranslation } from 'react-i18next';
import { ButtonsList } from 'src/components/button';

import { AuthPageWrapper } from '../style';

import { AuthMessageWrapper, Message, MenuLink } from './style';

export const MessagePageContainer = observer(() => {
  const { t } = useTranslation('auth');
  const { type, ...restParams } = useQuery({ type: 'error' });

  return (
    <AuthPageWrapper>
      <AuthMessageWrapper>
        <Grid verticalGap={24}>
          <GridColumn>
            <Message>{t(`message.${type}`, restParams)}</Message>
          </GridColumn>
          <GridColumn>
            <ButtonsList>
              <MenuLink to='/'>Главная</MenuLink>
              <MenuLink to='/auth/login'>Вход</MenuLink>
              <MenuLink to='/auth/registration'>Регистрация</MenuLink>
            </ButtonsList>
          </GridColumn>
        </Grid>
      </AuthMessageWrapper>
    </AuthPageWrapper>
  );
});
