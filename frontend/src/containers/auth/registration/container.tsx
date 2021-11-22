import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useForm } from 'react-hook-form';
import { Grid, GridColumn } from 'src/components/grid';
import { ControlledField } from 'src/components/controlled-field';
import InputText from 'src/components/input-text';
import InputPassword from 'src/components/input-password';
import Button, { ButtonsList } from 'src/components/button';
import ButtonLink from 'src/components/button-link';
import { checkEmptyObject } from 'src/utils/checkEmptyObject';
import { email as emailVal, required } from 'src/utils/validators';
import { useQuery } from 'src/hooks/useQuery';

import { AuthPageWrapper, AuthFormWrapper, FormTitle } from '../style';

import { useMapStoreToProps } from './selectors';

type FormInputs = {
  email: string;
  password: string;
  repeatPassword: string;
};

export const RegistrationPageContainer = observer(() => {
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
      <AuthFormWrapper onSubmit={handleSubmit(onSubmit)}>
        <Grid verticalGap={24}>
          <GridColumn>
            <FormTitle>Регистрация</FormTitle>
          </GridColumn>
          <GridColumn>
            <ControlledField
              name='email'
              control={control}
              defaultValue={email}
              rules={{
                ...required(),
                ...emailVal(),
              }}>
              <InputText label='Введите почту' />
            </ControlledField>
          </GridColumn>
          <GridColumn>
            <ControlledField name='password' control={control} rules={required()}>
              <InputPassword label='Придумайте пароль' />
            </ControlledField>
          </GridColumn>
          <GridColumn>
            <ControlledField
              name='repeatPassword'
              control={control}
              rules={{
                ...required(),
                validate: (value: any) => value === password || 'Введеные пароли не совпадают',
              }}>
              <InputPassword label='Повторите пароль' />
            </ControlledField>
          </GridColumn>
          <GridColumn>
            <ButtonsList marginTop={20}>
              <Button block={true} type='submit' disabled={hasErrors || formState.isSubmitting}>
                Зарегистрироваться
              </Button>
            </ButtonsList>
          </GridColumn>
          <GridColumn>
            <ButtonsList align='center'>
              <ButtonLink to={`/auth/login${search}`}>Уже есть аккаунт</ButtonLink>
            </ButtonsList>
          </GridColumn>
        </Grid>
      </AuthFormWrapper>
    </AuthPageWrapper>
  );
});
