import React from 'react';

import { StyledButtonLink } from './style';

export const ButtonLink = React.forwardRef((props: any, ref: any) => (
  <StyledButtonLink ref={ref} {...props} />
));
