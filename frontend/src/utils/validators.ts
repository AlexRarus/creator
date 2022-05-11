import { isValid, isBefore, isAfter, isSameDay } from 'date-fns';

const digitalRegExp = /^\d+$/;
const emailRegExp = /\S+@\S+\.\S+/;
const urlRegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
const integerRegExp = /^[-]?(0)?\b((?!0)\d+)?$/;
const floatRegExp = /^[-]?(0\.\d+)?\b((?!0)\d+\.\d+)?$/;

/**
 * утилита для комбинирования валидаций которые написаны через функцию "validate"
 * пример использования: rules={{...combineValidateMethods(isEmptyValues('__:__'), isBeforeDate(date))}}
 * @param methods
 */
export const combineValidateMethods = (
  ...methods: { validate: (value: any) => boolean | string }[]
) => ({
  validate: (value: any) => {
    return methods.reduce(
      (result: boolean | string, targetMethod: { validate: (value: any) => boolean | string }) => {
        if (result === true) {
          return targetMethod.validate(value);
        }
        return result;
      },
      true
    );
  },
});

export const validJSON = (message = 'Введите валидный JSON') => ({
  validate: (value: any) => {
    if (['', undefined].includes(value)) {
      // todo разрешаем пустое значение
      return true;
    }

    try {
      const json = JSON.parse(value);
      return (json && typeof json === 'object') || message;
    } catch {
      return message;
    }
  },
});

export const digital = (message = 'Поле может быть заполнено только цифрами') => ({
  pattern: {
    value: digitalRegExp,
    message,
  },
});

export const email = (message = 'Введите корректный email адрес') => ({
  pattern: {
    value: emailRegExp,
    message,
  },
});

export const url = (message = 'Введите корректный url') => ({
  pattern: {
    value: urlRegExp,
    message,
  },
});

export const required = (message = 'Поле обязательно для заполнения') => ({
  required: message,
});

export const isEmptyValues = (
  values: string[] = [],
  message = 'Поле обязательно для заполнения'
) => ({
  validate: (value: any) => {
    if (['', undefined].includes(value)) {
      // todo разрешаем пустое значение
      return true;
    }

    return !values.includes(value) || message;
  },
});

export const minLength = (value: number, message = 'Минимальная длинна {{count}}') => ({
  minLength: {
    value,
    message: message.replace('{{count}}', value.toString()),
  },
});

export const maxLength = (value: number, message = 'Максимальная длинна {{count}}') => ({
  maxLength: {
    value,
    message: message.replace('{{count}}', value.toString()),
  },
});

function isInteger(value: any) {
  return integerRegExp.test(value.toString());
}

function isFloat(value: any) {
  return floatRegExp.test(value.toString());
}

export const integer = (message = 'Значение должно соответствовать типу Integer') => ({
  validate: (value: any) => {
    if (['', undefined].includes(value)) {
      // todo разрешаем пустое значение
      return true;
    }

    try {
      return isInteger(value) || message;
    } catch {
      return message;
    }
  },
});

export const float = (message = 'Значение должно соответствовать типу Float') => ({
  validate: (value: any) => {
    if (['', undefined].includes(value)) {
      // todo разрешаем пустое значение
      return true;
    }

    try {
      return isFloat(value) || message;
    } catch {
      return message;
    }
  },
});

export const isBeforeDate = (date?: string | null, message = 'Дата должна быть меньше') => ({
  validate: (value: any) => {
    if (['', undefined, null].includes(value)) {
      // todo разрешаем пустое значение
      return true;
    }

    if (['', undefined, null].includes(date)) {
      // todo разрешаем пустое значение
      return true;
    }
    const preparedDate = new Date(date as string);
    const preparedValue = new Date(value as string);

    if (!isValid(preparedDate) || !isValid(preparedValue)) {
      // todo разрешаем не валидные даты
      return true;
    }

    try {
      return (
        isBefore(preparedValue, preparedDate) || isSameDay(preparedValue, preparedDate) || message
      );
    } catch {
      return message;
    }
  },
});

export const isAfterDate = (date?: string | null, message = 'Дата должна быть больше') => ({
  validate: (value: any) => {
    if (['', undefined, null].includes(value)) {
      // todo разрешаем пустое значение
      return true;
    }

    if (['', undefined, null].includes(date)) {
      // todo разрешаем пустое значение
      return true;
    }
    const preparedDate = new Date(date as string);
    const preparedValue = new Date(value as string);

    if (!isValid(preparedDate) || !isValid(preparedValue)) {
      // todo разрешаем не валидные даты
      return true;
    }

    try {
      return (
        isAfter(preparedValue, preparedDate) || isSameDay(preparedValue, preparedDate) || message
      );
    } catch {
      return message;
    }
  },
});
