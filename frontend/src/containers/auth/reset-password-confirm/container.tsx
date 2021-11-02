import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useForm } from 'react-hook-form';
import { Grid, GridColumn } from 'src/components/grid';
import { ControlledField } from 'src/components/controlled-field';
import InputPassword from 'src/components/input-password';
import Button, { ButtonsList } from 'src/components/button';
import { checkEmptyObject } from 'src/utils/checkEmptyObject';
import { required, minLength } from 'src/utils/validators';
import { useQuery } from 'src/hooks/useQuery';

import { AuthPageWrapper, AuthFormWrapper, FormTitle } from '../style';

import { useMapStoreToProps } from './selectors';

type FormInputs = {
  newPassword: string;
  repeatNewPassword: string;
};

export const ResetPasswordConfirmPageContainer = observer(() => {
  const { resetPasswordConfirmAction } = useMapStoreToProps();
  const { token } = useQuery({ next: '/' });

  const { watch, handleSubmit, formState, control } = useForm<FormInputs>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });
  const [hasErrors, setHasErrors] = useState(!checkEmptyObject(formState.errors));
  const password = watch('newPassword');

  useEffect(() => {
    setHasErrors(!checkEmptyObject(formState.errors));
  }, [formState]);

  const onSubmit = (data: FormInputs) =>
    resetPasswordConfirmAction({
      new_password: data.newPassword,
      token,
      uid: '', // todo пока не знаю что это (сраницу нужно переделать)
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
              name='newPassword'
              control={control}
              rules={{
                ...required(),
                ...minLength(1),
              }}>
              <InputPassword label='Придумайте новый пароль' />
            </ControlledField>
          </GridColumn>
          <GridColumn>
            <ControlledField
              name='repeatNewPassword'
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
              <Button block={true} type='submit' disabled={hasErrors}>
                Восстановить
              </Button>
            </ButtonsList>
          </GridColumn>
        </Grid>
      </AuthFormWrapper>
    </AuthPageWrapper>
  );
});
