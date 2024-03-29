import { IOption } from 'src/components/select';
import { IAction } from 'src/components/form';

import { FormInputs, IColor } from './interfaces';

const horizontalDirection: IOption = {
  value: 'to right',
  label: 'По горизонтали',
};
const verticalDirection: IOption = {
  value: 'to bottom',
  label: 'По вертикали',
};
export const directions: IOption[] = [horizontalDirection, verticalDirection];

export const prepareValueToOutput = (formInputs: FormInputs): string => {
  const value = [formInputs.direction.value];

  return `linear-gradient(${value
    .concat(formInputs.colors.map((color: IColor) => color.value))
    .join(', ')})`;
};

// подгтавливаем данные для формы
// входное значение linear-gradient(to bottom, rgba(255, 0, 0, 1), rgba(255, 255, 255, 0))
export const prepareDataToForm = (value: string, defaultColors: string[]): FormInputs => {
  const preparedValue = `${value}`.replace(/linear-gradient\((.+)\)/, '$1');
  const [direction, ...colors] = preparedValue
    .replace(/,\s#/g, 'SPLIT#')
    .replace(/,\srgb/g, 'SPLITrgb')
    .split('SPLIT');

  return {
    direction: directions.find((item: IOption) => item.value === direction) || verticalDirection,
    colors: colors.length
      ? colors.map((color: string) => ({
          id: Math.random(),
          value: color.trim(),
        }))
      : defaultColors.map((color: string) => ({
          id: Math.random(),
          value: color.trim(),
        })),
  };
};

export const actions: IAction[] = [
  {
    id: 'append',
    label: 'Добавить цвет',
  },
];
