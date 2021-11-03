import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { observer } from 'mobx-react';
import { Grid, GridColumn } from 'src/components/grid';
import { ControlledField } from 'src/components/controlled-field';
import InputText from 'src/components/input-text';
import InputPassword from 'src/components/input-password';
import Button, { ButtonsList } from 'src/components/button';
import ButtonLink from 'src/components/button-link';
import { checkEmptyObject } from 'src/utils/checkEmptyObject';
import { required } from 'src/utils/validators';
import { useQuery } from 'src/hooks/useQuery';

import { AuthPageWrapper, AuthFormWrapper, FormTitle } from '../style';

import { ForgotPasswordLink } from './style';
import { useMapStoreToProps } from './selectors';

type FormInputs = {
  email: string;
  password: string;
};

export const LoginPageContainer = observer(() => {
  const { loginAction } = useMapStoreToProps();
  const { search, next } = useQuery({
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

  const onSubmit = (data: FormInputs) => loginAction({ ...data, next });

  return (
    <AuthPageWrapper>
      <AuthFormWrapper onSubmit={handleSubmit(onSubmit)}>
        <Grid verticalGap={24}>
          <GridColumn>
            <FormTitle>Вход</FormTitle>
          </GridColumn>
          <GridColumn>
            <ControlledField name='email' control={control} rules={required()}>
              <InputText label='Email' />
            </ControlledField>
          </GridColumn>
          <GridColumn>
            <ControlledField name='password' control={control} rules={required()}>
              <InputPassword label='Пароль' />
            </ControlledField>
            <ForgotPasswordLink
              to={`/auth/reset-password${search}${search.length ? '&' : '?'}email=${username}`}>
              Не помню пароль
            </ForgotPasswordLink>
          </GridColumn>
          <GridColumn>
            <ButtonsList marginTop={20}>
              <Button block={true} type='submit' disabled={hasErrors}>
                Войти
              </Button>
            </ButtonsList>
          </GridColumn>
          <GridColumn>
            <ButtonsList align='center'>
              <ButtonLink to={`/auth/registration${search}`}>Еще нет аккаунта?</ButtonLink>
            </ButtonsList>
          </GridColumn>
        </Grid>
      </AuthFormWrapper>
    </AuthPageWrapper>
  );
});
