import React from 'react';

import { Button } from './component';

export default function Example() {
  const onClick = (id: string) => {
    console.log('onClick', { id });
  };

  return (
    <div
      style={{
        marginTop: '100px',
        marginLeft: '50px',
        width: '30%',
      }}
    >
      <Button id='example-button' onClick={onClick}>
        click me
      </Button>
    </div>
  );
}
