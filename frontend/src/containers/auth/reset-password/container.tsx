import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { observer } from 'mobx-react';
import { Grid, GridColumn } from 'src/components/grid';
import { ControlledField } from 'src/components/controlled-field';
import InputText from 'src/components/input-text';
import Button, { ButtonsList } from 'src/components/button';
import ButtonLink from 'src/components/button-link';
import { checkEmptyObject } from 'src/utils/checkEmptyObject';
import { required, email } from 'src/utils/validators';
import { useQuery } from 'src/hooks/useQuery';

import { AuthPageWrapper, AuthFormWrapper, FormTitle } from '../style';

import { useMapStoreToProps } from './selectors';

type FormInputs = {
  email: string;
};

export const ResetPasswordPageContainer = observer(() => {
  const { resetPasswordAction } = useMapStoreToProps();
  const { search, next } = useQuery({
    next: '/',
  });

  const { handleSubmit, formState, control } = useForm<FormInputs>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });
  const [hasErrors, setHasErrors] = useState(!checkEmptyObject(formState.errors));

  useEffect(() => {
    setHasErrors(!checkEmptyObject(formState.errors));
  }, [formState]);

  const onSubmit = (data: any) =>
    resetPasswordAction({
      ...data,
      next,
    });

  return (
    <AuthPageWrapper>
      <AuthFormWrapper onSubmit={handleSubmit(onSubmit)}>
        <Grid verticalGap={24}>
          <GridColumn>
            <FormTitle>Восстановаление пароля</FormTitle>
          </GridColumn>
          <GridColumn>
            <ControlledField
              name='email'
              control={control}
              rules={{
                ...required(),
                ...email(),
              }}>
              <InputText label='Введите адрес электронной почты' />
            </ControlledField>
          </GridColumn>
          <GridColumn>
            <ButtonsList marginTop={20}>
              <Button block={true} type='submit' disabled={hasErrors}>
                Восстановить
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
