import React from 'react';
import { Switch } from 'src/components/switch';
import Button from 'src/components/button';

import { Cell } from './style';

interface IProps {
  toggleHide?: () => void;
  onRemove?: () => void;
  onClone?: () => void;
  isVisible?: boolean;
  isLoading?: boolean;
}

export const SettingsTab = ({ toggleHide, isVisible, onRemove, onClone, isLoading }: IProps) => {
  return (
    <div>
      <Cell>
        <Switch onChange={toggleHide} value={!isVisible}>
          Скрыть блок на странице
        </Switch>
      </Cell>
      <Cell>
        <Button kind='based' disabled={isLoading} onClick={onRemove}>
          Удалить блок
        </Button>
      </Cell>
      <Cell>
        <Button kind='based' disabled={isLoading} onClick={onClone}>
          Клонировать блок
        </Button>
      </Cell>
    </div>
  );
};
