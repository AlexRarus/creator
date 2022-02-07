import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ITheme } from 'src/dal/themes/interfaces';
import Lottie from 'lottie-web';

import { ThemeBackground, ThemeAnimationBackground, Content } from './style';

interface IProps {
  theme?: ITheme | null;
  children: any;
}

export const UserThemeBackground = (props: IProps) => {
  const { theme, children } = props;
  const [backgroundStretch, setBackgroundStretch] = useState(false);
  const [backgroundElement, backgroundRefCallback] = useState<HTMLDivElement | null>(null);
  const [contentElement, contentRefCallback] = useState<HTMLDivElement | null>(null);
  const [animationElement, animationBackgroundRefCallback] = useState<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (animationElement && theme?.animation) {
      Lottie.loadAnimation({
        container: animationElement as Element,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: `/lottie/${theme.animation}`,
        rendererSettings: {
          preserveAspectRatio: 'xMinYMin slice', // Supports the same options as the svg element's preserveAspectRatio property
          progressiveLoad: false, // Boolean, only svg renderer, loads dom elements when needed. Might speed up initialization for large number of elements.
          hideOnTransparent: true, //Boolean, only svg renderer, hides elements when opacity reaches 0 (defaults to true)
          className: 'some-css-class-name',
        },
      });
    }
  }, [animationElement, theme]);

  useEffect(() => {
    if (contentElement && backgroundElement) {
      const contentHeight = contentElement.getBoundingClientRect().height;
      const backgroundHeight = backgroundElement.getBoundingClientRect().height;
      setBackgroundStretch(contentHeight < backgroundHeight);
    }
  }, [backgroundElement, contentElement]);

  return (
    <ThemeBackground
      selectedTheme={theme}
      ref={backgroundRefCallback}
      backgroundStretch={backgroundStretch}>
      {theme?.type === 'animated' && (
        <ThemeAnimationBackground
          ref={animationBackgroundRefCallback}
          position={theme?.animationPosition}
          size={theme?.animationSize}
        />
      )}
      <Content ref={contentRefCallback}>{children}</Content>
    </ThemeBackground>
  );
};
