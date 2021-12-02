import React from 'react';

import { FormButtons, IAction } from './form-buttons';
import { FormWrapper, FormBody, FormFooter } from './style';
export type { IAction } from './form-buttons';

interface IProps {
  onAction(actionId: string): void;
  children: any;
  actions?: IAction[];
  submitActionLabel?: string;
  isValid?: boolean; // доступность кнопки "Отправить"
  isLoading?: boolean;
}

export { MobileSize, DesktopSize } from 'src/components/modal';

/**
 * Это обертка для создани форм
 * на форме по дефолту отображается 2 кнопки "Отмена" и "Отправить"
 * за место кнопки "Отмена" можно отрендерить любую другую кнопку передав 1 элемент в массиве "actions"
 * если передать несколько элементов в массиве "actions" то за место кнопки "Отмена" будет отображаться кнопка "Действие"
 * при нажатии на которую выпадет список действий (для действий можно устанавливать подтверждение) см. IAction
 * При срабатывании любого экшена (например "submit" (есть всегда), "cancel") или любого переданного в массиве "actions"
 * будет вызван колбэк onAction() с переданным id экшена
 * @param props
 * @constructor
 */
export const Form = (props: IProps) => {
  const { onAction, children, actions, isValid, isLoading, submitActionLabel } = props;

  return (
    <FormWrapper>
      <FormBody>{children}</FormBody>
      <FormFooter>
        <FormButtons
          actions={actions}
          onAction={onAction}
          submitActionLabel={submitActionLabel}
          isValid={isValid}
          isLoading={isLoading}
        />
      </FormFooter>
    </FormWrapper>
  );
};
