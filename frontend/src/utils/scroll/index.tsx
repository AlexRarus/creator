import React, { useState } from 'react';
import { isBrowser } from 'src/utils/detectEnvironment';

import { GlobalStyle } from './style';
import { useScrolling } from './hooks';

export { disableScroll, enableScroll } from './disable-scroll';

interface IProps {
  baseBackground?: string;
}

export function ScrollGlobalStyle(props: IProps) {
  const isScrolling = useScrolling();
  // todo ssr костыль
  const [isWin] = useState(isBrowser ? navigator?.appVersion.toLowerCase().includes('win') : false);

  return <GlobalStyle {...props} isScrolling={isScrolling} isWin={isWin} />;
}
