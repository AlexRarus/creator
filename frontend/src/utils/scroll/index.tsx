import React, { useState } from 'react';

import { GlobalStyle } from './style';
import { useScrolling } from './hooks';

export { disableScroll, enableScroll } from './disable-scroll';

interface IProps {
  baseBackground?: string;
}

export function ScrollGlobalStyle(props: IProps) {
  const isScrolling = useScrolling();
  const [isWin] = useState(navigator?.appVersion.toLowerCase().includes('win'));

  return <GlobalStyle {...props} isScrolling={isScrolling} isWin={isWin} />;
}
