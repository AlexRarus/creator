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
    let animation: any;
    if (animationElement && theme?.animation) {
      animation = Lottie.loadAnimation({
        name: theme.slug,
        container: document.getElementById(`theme-animation-block-${theme.slug}`) as Element,
        renderer: 'canvas',
        loop: true,
        autoplay: true,
        path: `/lottie/${theme.animation}`,
        // rendererSettings: {
        //   preserveAspectRatio: 'xMinYMin slice', // Supports the same options as the svg element's preserveAspectRatio property
        // progressiveLoad: false, // Boolean, only svg renderer, loads dom elements when needed. Might speed up initialization for large number of elements.
        // hideOnTransparent: true, //Boolean, only svg renderer, hides elements when opacity reaches 0 (defaults to true)
        // className: `some-css-class-name-${theme.slug}`,
        // },
        rendererSettings: {
          // context: ctx, // the canvas context, only support "2d" context
          preserveAspectRatio: 'xMidYMin slice', // Supports the same options as the svg element's preserveAspectRatio property
          clearCanvas: true,
          // progressiveLoad: false, // Boolean, only svg renderer, loads dom elements when needed. Might speed up initialization for large number of elements.
          // hideOnTransparent: true, //Boolean, only svg renderer, hides elements when opacity reaches 0 (defaults to true)
          className: 'some-css-class-name',
          id: `some-id-${theme.slug}`,
        },
      } as any);
    }

    return () => animation?.destroy(theme?.slug);
  }, [animationElement, theme]);

  useEffect(() => {
    if (contentElement && backgroundElement) {
      const contentHeight = contentElement.getBoundingClientRect().height;
      const backgroundParent = backgroundElement?.parentElement;
      const backgroundParentHeight = backgroundParent?.getBoundingClientRect()?.height as any;

      setBackgroundStretch(contentHeight < backgroundParentHeight);
    }
  }, [backgroundElement, contentElement]);

  return (
    <ThemeBackground
      selectedTheme={theme}
      ref={backgroundRefCallback}
      backgroundStretch={backgroundStretch}>
      {theme?.type === 'animated' && (
        <ThemeAnimationBackground
          id={`theme-animation-block-${theme.slug}`}
          ref={animationBackgroundRefCallback}
          position={theme?.animationPosition}
          size={theme?.animationSize}
        />
      )}
      <Content ref={contentRefCallback}>{children}</Content>
    </ThemeBackground>
  );
};
