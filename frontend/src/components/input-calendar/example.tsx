import React, { useState } from 'react';

import { InputCalendar } from './component';

export default function Example() {
  const [value, setValue] = useState<Date | null>(null);

  const onChange = (value: Date | null, id: string) => {
    setValue(value);
    console.log('onChange', {
      value,
      id,
    });
  };

  return (
    <div style={{ width: '30%' }}>
      <InputCalendar id='example-input-calendar' value={value} onChange={onChange} />
    </div>
  );
}
