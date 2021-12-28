import React from 'react';

import { FormInputs } from './interfaces';
import { FieldsBlockMain } from './fields-blocks/main';

interface IProps {
  buttonTypes: any[];
  formDefaultValues: FormInputs | null;
}

export const ButtonFields = (props: IProps) => {
  return (
    <>
      <FieldsBlockMain {...props} />
    </>
  );
};
