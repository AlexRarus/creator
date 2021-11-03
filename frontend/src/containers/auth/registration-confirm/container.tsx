import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import { Grid, GridColumn } from 'src/components/grid';
import { ButtonsList } from 'src/components/button';
import { useQuery } from 'src/hooks/useQuery';

import { AuthPageWrapper } from '../style';

import { Message, AuthMessageWrapper, MenuLink } from './style';
import { useMapStoreToProps } from './selectors';

interface IParams {
  uid: string;
  token: string;
}

export const RegistrationConfirmPageContainer = observer(() => {
  const { registrationConfirmAction } = useMapStoreToProps();
  const params = useParams<IParams>();
  const { next } = useQuery({
    next: `/auth/login`,
  });

  useEffect(() => {
    registrationConfirmAction({ ...params, next });
  }, []);

  // TODO здесь можно вывести лоадер запроса registrationConfirmAction и в случае неудачи показать информативное сообщение
  // TODO (в успешном случаем пользователя перекидывает на страницу логина)
  return (
    <AuthPageWrapper>
      <AuthMessageWrapper>
        <Grid verticalGap={24}>
          <GridColumn>
            <Message>Подтверждение email адреса...</Message>
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
