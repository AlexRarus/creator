import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useForm } from 'react-hook-form';
import { ControlledField } from 'src/components/controlled-field';
import InputText from 'src/components/input-text';
import InputPassword from 'src/components/input-password';
import Button from 'src/components/button';
import ButtonLink from 'src/components/button-link';
import { checkEmptyObject } from 'src/utils/checkEmptyObject';
import { email as emailVal, required } from 'src/utils/validators';
import { useQuery } from 'src/hooks/useQuery';
import Facebook from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import Instagram from '@mui/icons-material/Instagram';

import { AnimateBackground } from '../animate';
import {
  AuthPageWrapper,
  AuthFormWrapper,
  FormTitle,
  AuthCommonButton,
  AuthRow,
  AuthSeparate,
  ButtonRow,
  AnimateWrapper,
} from '../style';

import { useMapStoreToProps } from './selectors';

type FormInputs = {
  email: string;
  password: string;
  repeatPassword: string;
};

export const RegistrationPageContainer = observer(() => {
  // TODO скрывам регистрацию с помощью facebook vk gmail пока не реализовано
  const [additionalLogins] = useState(false);
  const { registrationAction } = useMapStoreToProps();
  const { search, email } = useQuery({
    next: '/auth/message?type=registration-confirm&email=',
  });
  const { watch, handleSubmit, formState, control } = useForm<FormInputs>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });
  const [hasErrors, setHasErrors] = useState(!checkEmptyObject(formState.errors));
  const password = watch('password');

  useEffect(() => {
    setHasErrors(!checkEmptyObject(formState.errors));
  }, [formState]);

  const onSubmit = async (data: FormInputs) => {
    await registrationAction({
      ...data,
      // next: next + data.email,
    });
  };

  return (
    <AuthPageWrapper>
      <AnimateWrapper>
        <AnimateBackground />
      </AnimateWrapper>
      <AuthFormWrapper onSubmit={handleSubmit(onSubmit)}>
        <FormTitle>Регистрация</FormTitle>
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
          <ControlledField
            name='email'
            control={control}
            defaultValue={email}
            rules={{
              ...required(),
              ...emailVal(),
            }}>
            <InputText dimension={'xl'} kind={'formed'} placeholder='Введите почту' />
          </ControlledField>
        </AuthRow>
        <AuthRow>
          <ControlledField name='password' control={control} rules={required()}>
            <InputPassword dimension={'xl'} kind={'formed'} placeholder='Придумайте пароль' />
          </ControlledField>
        </AuthRow>
        <AuthRow>
          <ControlledField
            name='repeatPassword'
            control={control}
            rules={{
              ...required(),
              validate: (value: any) => value === password || 'Введеные пароли не совпадают',
            }}>
            <InputPassword dimension={'xl'} kind={'formed'} placeholder='Повторите пароль' />
          </ControlledField>
        </AuthRow>
        <ButtonRow>
          <Button
            kind={'formed'}
            block={true}
            type='submit'
            disabled={hasErrors || formState.isSubmitting}>
            Зарегистрироваться
          </Button>
        </ButtonRow>
        <AuthRow>
          <ButtonLink to={`/auth/login${search}`}>Уже есть аккаунт</ButtonLink>
        </AuthRow>
      </AuthFormWrapper>
    </AuthPageWrapper>
  );
});
