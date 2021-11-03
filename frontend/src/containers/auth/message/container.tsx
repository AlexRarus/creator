import React, { useCallback, useState } from 'react';
import { observer } from 'mobx-react';
import { Grid, GridColumn } from 'src/components/grid';
import { useQuery } from 'src/hooks/useQuery';
import { useTranslation } from 'react-i18next';
import { ButtonsList } from 'src/components/button';

import { AuthPageWrapper } from '../style';

import { Timer } from './timer';
import { AuthMessageWrapper, Message, MenuLink } from './style';
import { useMapStoreToProps } from './selectors';

const TIMER_MS = 60 * 1000;

export const MessagePageContainer = observer(() => {
  const { t } = useTranslation('auth');
  const { type, email, ...restParams } = useQuery({ type: 'error' });
  const { resendRegistrationConfirmAction } = useMapStoreToProps();
  const [timerId, setTimerId] = useState<any>(null);

  const onResend = useCallback(() => {
    if (email && timerId === null) {
      setTimerId(window.setTimeout(() => setTimerId(null), TIMER_MS));
      resendRegistrationConfirmAction({ email });
    }
  }, []);

  return (
    <AuthPageWrapper>
      <AuthMessageWrapper>
        <Grid verticalGap={24}>
          <GridColumn>
            <Message>{t(`message.${type}`, { ...restParams, email })}</Message>
            {type === 'registration-confirm' && email && (
              <div>
                Если письмо не пришло в течении нескольких минут, вы можете отправить его{' '}
                <span onClick={onResend} style={{ cursor: 'pointer', color: 'blue' }}>
                  повторно
                </span>
                {timerId !== null && (
                  <>
                    <Timer
                      time={TIMER_MS / 1000}
                      style={{ marginLeft: '5px', marginRight: '5px' }}
                    />
                    с
                  </>
                )}
                .
              </div>
            )}
          </GridColumn>
          <GridColumn>
            <ButtonsList>
              <MenuLink to='/'>Главная</MenuLink>
              <MenuLink to='/auth/login'>Вход</MenuLink>
              <MenuLink to='/auth/registration'>Регистрация</MenuLink>
            </ButtonsList>
          </GridColumn>
        </Grid>
      </AuthMessageWrapper>
    </AuthPageWrapper>
  );
});
