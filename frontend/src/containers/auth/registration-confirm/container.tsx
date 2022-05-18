import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import { ButtonsList } from 'src/components/button';
import { useQuery } from 'src/hooks/useQuery';

import { AuthPageWrapper, AuthFormWrapper, AuthRow } from '../style';

import { Message, MenuLink } from './style';
import { useMapStoreToProps } from './selectors';

interface IParams {
  uid: string;
  token: string;
  [key: string]: string | undefined;
}

export const RegistrationConfirmPageContainer = observer(() => {
  const { registrationConfirmAction } = useMapStoreToProps();
  const params = useParams<IParams>();
  const { next } = useQuery({
    next: `/auth/login`,
  });

  useEffect(() => {
    registrationConfirmAction({
      uid: params.uid as string,
      token: params.token as string,
      next,
    });
  }, []);

  // TODO здесь можно вывести лоадер запроса registrationConfirmAction и в случае неудачи показать информативное сообщение
  // TODO (в успешном случаем пользователя перекидывает на страницу логина)
  return (
    <AuthPageWrapper>
      <AuthFormWrapper>
        <AuthRow>
          <Message>Подтверждение email адреса...</Message>
        </AuthRow>
        <AuthRow>
          <ButtonsList>
            <MenuLink to='/'>Главная</MenuLink>
            <MenuLink to='/auth/login'>Вход</MenuLink>
            <MenuLink to='/auth/registration'>Регистрация</MenuLink>
          </ButtonsList>
        </AuthRow>
      </AuthFormWrapper>
    </AuthPageWrapper>
  );
});
