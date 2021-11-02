import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useForm } from 'react-hook-form';
import { Grid, GridColumn } from 'src/components/grid';
import { ControlledField } from 'src/components/controlled-field';
import InputText from 'src/components/input-text';
import Button, { ButtonsList } from 'src/components/button';
import { checkEmptyObject } from 'src/utils/checkEmptyObject';
import { required } from 'src/utils/validators';
import { useQuery } from 'src/hooks/useQuery';
import { useTranslation } from 'react-i18next';

import { AuthPageWrapper, AuthFormWrapper, FormTitle } from '../style';

import { Message } from './style';
import { useMapStoreToProps } from './selectors';

type FormInputs = {
  token: string;
};

export const RegistrationConfirmPageContainer = observer(() => {
  const { activationAction } = useMapStoreToProps();
  const { next } = useQuery({
    next: '/',
  });
  const { t } = useTranslation('auth');

  const { handleSubmit, formState, control } = useForm<FormInputs>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });
  const [hasErrors, setHasErrors] = useState(!checkEmptyObject(formState.errors));

  useEffect(() => {
    setHasErrors(!checkEmptyObject(formState.errors));
  }, [formState]);

  const onSubmit = (data: FormInputs) =>
    activationAction({
      ...data,
      uid: '', // todo не знаю что это (страницу доработать)
      next,
    });

  return (
    <AuthPageWrapper>
      <AuthFormWrapper onSubmit={handleSubmit(onSubmit)}>
        <Grid verticalGap={24}>
          <GridColumn>
            <FormTitle>Подтверждение регистрации</FormTitle>
          </GridColumn>
          <GridColumn>
            <ControlledField name='confirmation_code' control={control} rules={required()}>
              <InputText label='Введите код подтверждения' />
            </ControlledField>
          </GridColumn>
          <GridColumn>
            <ButtonsList marginTop={20}>
              <Button block={true} type='submit' disabled={hasErrors}>
                Подтвердить
              </Button>
            </ButtonsList>
          </GridColumn>
          <GridColumn>
            <Message>{t('message.registration-confirm')}</Message>
          </GridColumn>
        </Grid>
      </AuthFormWrapper>
    </AuthPageWrapper>
  );
});
