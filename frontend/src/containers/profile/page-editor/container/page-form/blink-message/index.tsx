import React, { useState, useEffect } from 'react';

import { BlinkMessageWrapper } from './style';

interface IProps {
  children: any;
  showId?: string;
  blinkTime?: number;
}

export const BlinkMessage = (props: IProps) => {
  const { showId, blinkTime = 1000, children } = props;
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (showId) {
      setIsShow(true);
    }
  }, [showId]);

  useEffect(() => {
    let timerId: any;
    if (isShow) {
      timerId = setTimeout(() => setIsShow(false), blinkTime);
    }

    return () => {
      if (isShow) {
        window.clearInterval(timerId);
      }
    };
  }, [isShow]);

  return <BlinkMessageWrapper isShow={isShow}>{children}</BlinkMessageWrapper>;
};
