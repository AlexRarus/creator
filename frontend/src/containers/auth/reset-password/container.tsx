import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { observer } from 'mobx-react';
import { ControlledField } from 'src/components/controlled-field';
import InputText from 'src/components/input-text';
import Button, { ButtonsList } from 'src/components/button';
import ButtonLink from 'src/components/button-link';
import { checkEmptyObject } from 'src/utils/checkEmptyObject';
import { required, email as emailValidator } from 'src/utils/validators';
import { useQuery } from 'src/hooks/useQuery';

import { AuthPageWrapper, AuthFormWrapper, FormTitle, AuthRow, ButtonRow } from '../style';

import { useMapStoreToProps } from './selectors';

type FormInputs = {
  email: string;
};

export const ResetPasswordPageContainer = observer(() => {
  const { resetPasswordAction } = useMapStoreToProps();
  const { search, next, email } = useQuery({
    email: '',
    next: '/auth/message?type=reset-password-check-email',
  });

  const { handleSubmit, formState, control } = useForm<FormInputs>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      email,
    },
  });
  const [hasErrors, setHasErrors] = useState(!checkEmptyObject(formState.errors));

  useEffect(() => {
    setHasErrors(!checkEmptyObject(formState.errors));
  }, [formState]);

  const onSubmit = (data: FormInputs) =>
    resetPasswordAction({
      ...data,
      next,
    });

  return (
    <AuthPageWrapper>
      <AuthFormWrapper onSubmit={handleSubmit(onSubmit)}>
        <FormTitle>Восстановаление пароля</FormTitle>
        <AuthRow>
          <ControlledField
            name='email'
            control={control}
            rules={{
              ...required(),
              ...emailValidator(),
            }}>
            <InputText dimension={'xl'} kind={'formed'} placeholder='Введите почту' />
          </ControlledField>
        </AuthRow>
        <ButtonRow>
          <Button kind={'formed'} block={true} type='submit' disabled={hasErrors}>
            Восстановить
          </Button>
        </ButtonRow>
        <AuthRow>
          <ButtonsList align='center'>
            <ButtonLink to={`/auth/registration${search}`}>Еще нет аккаунта?</ButtonLink>
          </ButtonsList>
        </AuthRow>
      </AuthFormWrapper>
    </AuthPageWrapper>
  );
});
