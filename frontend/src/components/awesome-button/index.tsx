import React, { useState } from 'react';

import { Button } from './style';

interface IProps {
  onClick?: any;
  children?: any;
}

export const AwesomeButton = ({ onClick, children }: IProps) => {
  const [isAnimate, setAnimate] = useState(false);
  const animateButton = () => {
    setAnimate(true);

    // reset animation
    setTimeout(function () {
      setAnimate(false);
    }, 500);
  };

  const handleClick = () => {
    animateButton();
    onClick && onClick();
  };

  return (
    <Button isAnimate={isAnimate} onClick={handleClick}>
      {children}
    </Button>
  );
};
