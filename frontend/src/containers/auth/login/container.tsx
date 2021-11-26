import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { observer } from 'mobx-react';
import { ControlledField } from 'src/components/controlled-field';
import InputText from 'src/components/input-text';
import InputPassword from 'src/components/input-password';
import Button, { ButtonsList } from 'src/components/button';
import ButtonLink from 'src/components/button-link';
import { checkEmptyObject } from 'src/utils/checkEmptyObject';
import { required } from 'src/utils/validators';
import { useQuery } from 'src/hooks/useQuery';
import Facebook from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import Instagram from '@mui/icons-material/Instagram';

import {
  AuthPageWrapper,
  AuthFormWrapper,
  FormTitle,
  AuthRow,
  AuthColumn,
  AuthSpan,
  AuthCommonButton,
  AuthSeparate,
} from '../style';

import { ForgotPasswordLink } from './style';
import { useMapStoreToProps } from './selectors';

type FormInputs = {
  email: string;
  password: string;
};

export const LoginPageContainer = observer(() => {
  const { loginAction } = useMapStoreToProps();
  const { search } = useQuery({
    next: '/',
  });
  const { watch, handleSubmit, formState, control } = useForm<FormInputs>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });
  const [hasErrors, setHasErrors] = useState(!checkEmptyObject(formState.errors));
  const username = watch('email');

  useEffect(() => {
    setHasErrors(!checkEmptyObject(formState.errors));
  }, [formState]);

  const onSubmit = (data: FormInputs) => loginAction({ ...data });

  return (
    <AuthPageWrapper>
      <AuthFormWrapper onSubmit={handleSubmit(onSubmit)}>
        <FormTitle>Вход</FormTitle>
        <AuthRow>
          <AuthCommonButton>
            <Facebook />
          </AuthCommonButton>
          <AuthCommonButton>
            <GoogleIcon />
          </AuthCommonButton>
          <AuthCommonButton>
            <Instagram />
          </AuthCommonButton>
        </AuthRow>
        <AuthSeparate />
        <AuthRow>
          <ControlledField name='email' control={control} rules={required()}>
            <InputText label='Email' />
          </ControlledField>
        </AuthRow>
        <AuthColumn>
          <AuthSpan>
            <ControlledField name='password' control={control} rules={required()}>
              <InputPassword label='Пароль' />
            </ControlledField>
          </AuthSpan>
          <AuthSpan>
            <ForgotPasswordLink
              to={`/auth/reset-password${search}${search.length ? '&' : '?'}email=${username}`}>
              Не помню пароль
            </ForgotPasswordLink>
          </AuthSpan>
        </AuthColumn>
        <AuthRow>
          <ButtonsList marginTop={20}>
            <Button block={true} type='submit' disabled={hasErrors}>
              Войти
            </Button>
          </ButtonsList>
        </AuthRow>
        <AuthRow>
          <ButtonsList align='center'>
            <ButtonLink to={`/auth/registration${search}`}>Еще нет аккаунта?</ButtonLink>
          </ButtonsList>
        </AuthRow>
      </AuthFormWrapper>
    </AuthPageWrapper>
  );
});
