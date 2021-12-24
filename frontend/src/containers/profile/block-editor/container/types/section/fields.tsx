import React from 'react';

import { FieldBlockMain } from './fields-blocks/main';
import { FieldBlockBackground } from './fields-blocks/background';
import { FormInputs } from './interfaces';

interface IProps {
  formDefaultValues: FormInputs | null;
}

export const SectionFields = (props: IProps) => {
  const { formDefaultValues } = props;

  return (
    <>
      <FieldBlockMain formDefaultValues={formDefaultValues} />
      <FieldBlockBackground formDefaultValues={formDefaultValues} />
    </>
  );
};
