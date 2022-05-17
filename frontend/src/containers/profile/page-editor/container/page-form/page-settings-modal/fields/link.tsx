import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Grid, GridColumn } from 'src/components/grid';
import { ControlledField } from 'src/components/controlled-field';
import { required, maxLength } from 'src/utils/validators';
import InputText from 'src/components/input-text';
import { IPage } from 'src/dal/pages/interfaces';
import { IUser } from 'src/dal/auth/interfaces';
import { Switch } from 'src/components/switch';
import { Confirm } from 'src/components/confirm';

import { FormInputs } from '../interfaces';

import { LinkRow, DomainPart, UsernamePart, SlugPart } from './style';

interface IProps {
  formDefaultValues: FormInputs | null;
  pageData: IPage;
  user: IUser | null;
  pagesCount: number;
}

export const LinkFields = (props: IProps) => {
  const { formDefaultValues, pageData, user, pagesCount } = props;
  const { control, watch, unregister, setValue } = useFormContext(); // так как Fields рендерятся внутри FormProvider, в контексте доступны значения формы
  const [activeField, setActiveField] = useState<string | null>(null);
  const [isOpenIndexConfirm, setIsOpenIndexConfirm] = useState(false);
  const isIndex = watch('isIndex');
  const username = watch('username');
  const slug = watch('slug');
  // показываем переключатель если у пользователя кол-во страниц больше 1 ИЛИ (если страница 1) НЕТ индексной страницы
  const hasIndexPageSwitch = pagesCount !== 1 || user?.index_page?.id !== pageData?.id;

  useEffect(() => {
    if (isIndex) {
      unregister('slug');
    } else {
      setValue('slug', formDefaultValues?.slug);
    }
  }, [isIndex]);

  useEffect(() => {
    if (isIndex && user?.index_page && user?.index_page?.id !== pageData?.id) {
      // если уже есть индексная страница, переспросить подтверждение
      setIsOpenIndexConfirm(true);
    }
  }, [isIndex]);

  const onFocusSlug = () => {
    setActiveField('slug');
  };
  const onFocusUsername = () => {
    setActiveField('username');
  };

  const onBlur = () => {
    setActiveField(null);
  };

  const onDeclineIndex = () => {
    setValue('isIndex', false);
  };

  const onCloseConfirmIndex = () => {
    setIsOpenIndexConfirm(false);
  };

  return (
    <Grid verticalGap={24}>
      <GridColumn>
        <LinkRow>
          <DomainPart>{window.location.origin}/</DomainPart>
          <UsernamePart isActive={activeField === 'username'}>{username}</UsernamePart>
          <SlugPart isActive={activeField === 'slug'}>{isIndex ? '' : `/${slug}`}</SlugPart>
        </LinkRow>
      </GridColumn>
      {hasIndexPageSwitch && (
        <GridColumn>
          <ControlledField control={control} name='isIndex' formDefaultValues={formDefaultValues}>
            <Switch justify='flex-start' labelPosition='right'>
              Главная страница
            </Switch>
          </ControlledField>
        </GridColumn>
      )}
      <GridColumn>
        <ControlledField
          name='username'
          control={control}
          rules={{ ...required(), ...maxLength(35) }}
          formDefaultValues={formDefaultValues}>
          <InputText onFocus={onFocusUsername} onBlur={onBlur} label='Имя пользователя' />
        </ControlledField>
      </GridColumn>
      {!isIndex && (
        <GridColumn>
          <ControlledField
            name='slug'
            control={control}
            rules={{ ...required(), ...maxLength(35) }}
            formDefaultValues={formDefaultValues}>
            <InputText onFocus={onFocusSlug} onBlur={onBlur} label='Slug' />
          </ControlledField>
        </GridColumn>
      )}
      {isOpenIndexConfirm && (
        <Confirm
          onCancel={onDeclineIndex}
          onClose={onCloseConfirmIndex}
          confirmMessage='У Вас уже есть главная страница, вы точно хотите установить текущую страницу в качестве главной?'
          confirmTitle='Изменение главной страницы'
          confirmButton={{
            label: 'Подтвердить',
          }}
        />
      )}
    </Grid>
  );
};
