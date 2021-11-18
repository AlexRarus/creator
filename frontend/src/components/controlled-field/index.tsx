import React from 'react';
import { useController } from 'react-hook-form';

interface IProps {
  children: any;
  name: string;
  control: any;
  rules?: any;
  defaultValue?: any;
  formDefaultValues?: any;
}

// обертка для регистрации полей в форме формы
// принимает ПОЛЕ в качестве children и передает в него onChange, value и error
// поле контролировать НЕ нужно, просто получать информацио о состоянии ВСЕЙ формы сразу
export function ControlledField(props: IProps) {
  const { children, control, name, rules, defaultValue, formDefaultValues } = props;
  const defValue = defaultValue || (formDefaultValues && formDefaultValues[name]);
  const {
    // eslint-disable-next-line
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue: defValue,
  });

  return (
    <>
      {React.Children.map(children, (child) => {
        return React.createElement(child.type, {
          ...{
            ...child.props,
            ...inputProps,
            error: error?.message,
            key: child.props.name,
          },
        });
      })}
    </>
  );
}
