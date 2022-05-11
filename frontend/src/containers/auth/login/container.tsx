import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { observer } from 'mobx-react';
import { ControlledField } from 'src/components/controlled-field';
import InputText from 'src/components/input-text';
import InputPassword from 'src/components/input-password';
import Button from 'src/components/button';
import ButtonLink from 'src/components/button-link';
import { checkEmptyObject } from 'src/utils/checkEmptyObject';
import { required } from 'src/utils/validators';
import { useQuery } from 'src/hooks/useQuery';
import Facebook from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import Instagram from '@mui/icons-material/Instagram';

import { AnimateBackground } from '../animate';
import {
  AuthPageWrapper,
  AuthFormWrapper,
  FormTitle,
  AuthRow,
  AuthColumn,
  AuthSpan,
  AuthCommonButton,
  AuthSeparate,
  ButtonRow,
  AnimateWrapper,
} from '../style';

import { ForgotPasswordLink } from './style';
import { useMapStoreToProps } from './selectors';

type FormInputs = {
  email: string;
  password: string;
};

export const LoginPageContainer = observer(() => {
  // TODO скрывам логин с помощью facebook vk gmail пока не реализовано
  const [additionalLogins] = useState(false);
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
      <AnimateWrapper>
        <AnimateBackground />
      </AnimateWrapper>
      <AuthFormWrapper onSubmit={handleSubmit(onSubmit)}>
        <FormTitle>Вход</FormTitle>
        {additionalLogins && (
          <>
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
          </>
        )}
        <AuthRow>
          <ControlledField name='email' control={control} rules={required()}>
            <InputText dimension='xl' kind='formed' label='Email' />
          </ControlledField>
        </AuthRow>
        <AuthColumn>
          <AuthSpan>
            <ControlledField name='password' control={control} rules={required()}>
              <InputPassword dimension='xl' kind='formed' label='Пароль' />
            </ControlledField>
          </AuthSpan>
          <AuthSpan>
            <ForgotPasswordLink
              to={`/auth/reset-password${search}${search.length ? '&' : '?'}email=${username}`}>
              Не помню пароль
            </ForgotPasswordLink>
          </AuthSpan>
        </AuthColumn>
        <ButtonRow>
          <Button kind='formed' block={true} type='submit' disabled={hasErrors}>
            Войти
          </Button>
        </ButtonRow>
        <AuthRow>
          <ButtonLink to={`/auth/registration${search}`}>Еще нет аккаунта?</ButtonLink>
        </AuthRow>
      </AuthFormWrapper>
    </AuthPageWrapper>
  );
});
