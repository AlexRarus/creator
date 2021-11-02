const emailRegExp = /\S+@\S+\.\S+/;

export const email = (message = 'Введите корректный email адрес') => ({
  pattern: {
    value: emailRegExp,
    message,
  },
});

export const required = (message = 'Поле обязательно для заполнения') => ({
  required: message,
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
