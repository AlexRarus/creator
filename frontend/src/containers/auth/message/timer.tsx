import React, { useEffect, useState } from 'react';

interface IProps {
  time: number; // время в секундах
  style?: any;
}

export const Timer = (props: IProps) => {
  const { time, style } = props;
  const [value, setValue] = useState(time);

  useEffect(() => {
    let timerId: any;
    if (value) {
      timerId = window.setTimeout(() => {
        setValue(value - 1);
      }, 1000);
    }

    return () => window.clearTimeout(timerId);
  }, [value]);

  return <span style={style}>{value}</span>;
};
