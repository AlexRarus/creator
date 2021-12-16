import React, { useState } from 'react';

import { StyledSvg, Bubbles, Bubble, Button } from './style';

interface IProps {
  onClick?: any;
  children?: any;
  bubblesSize?: number;
}

export const AwesomeButton = ({ onClick, children, bubblesSize = 10 }: IProps) => {
  const [bubbles] = useState(Array.from(Array(bubblesSize).keys()));

  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <>
      <StyledSvg xmlns='http://www.w3.org/2000/svg' version='1.1'>
        <defs>
          <filter id='gooey'>
            {/* in="sourceGraphic */}
            <feGaussianBlur in='SourceGraphic' stdDeviation='5' result='blur' />
            <feColorMatrix
              in='blur'
              type='matrix'
              values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9'
              result='highContrastGraphic'
            />
            <feComposite in='SourceGraphic' in2='highContrastGraphic' operator='atop' />
          </filter>
        </defs>
      </StyledSvg>
      <Button onClick={handleClick}>
        {children}
        <Bubbles>
          {bubbles.map((item, index) => (
            <Bubble key={index} index={index + 1} />
          ))}
        </Bubbles>
      </Button>
    </>
  );
};
