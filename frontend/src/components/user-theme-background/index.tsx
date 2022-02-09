import React, { useEffect, useState } from 'react';
import { ITheme } from 'src/dal/themes/interfaces';
import Lottie from 'lottie-react';

import { ThemeBackground, ThemeAnimationBackground, Content } from './style';

interface IProps {
  theme?: ITheme | null;
  children: any;
}

export const UserThemeBackground = (props: IProps) => {
  const { theme, children } = props;
  const [backgroundStretch, setBackgroundStretch] = useState(false);
  const [backgroundElement, backgroundRefCallback] = useState<HTMLDivElement | null>(null);
  const [themeAnimationElement, themeAnimationRefCallback] = useState<HTMLDivElement | null>(null);
  const [contentElement, contentRefCallback] = useState<HTMLDivElement | null>(null);
  const [backgroundWidth, setBackgroundWidth] = useState<number | null>(null);

  const [animationData, setAnimationData] = useState<any>();
  const [animationDataWidth, setAnimationDataWidth] = useState<number | null>(null);
  const [animationDataHeight, setAnimationDataHeight] = useState<number | null>(null);

  useEffect(() => {
    if (theme?.animation && !animationData) {
      const fetchAnimation = async () => {
        const json = await fetch(`/lottie/${theme.animation}`).then((res) => res.json());
        setAnimationData(json);
      };

      fetchAnimation();
    }
  }, [theme, animationData]);

  useEffect(() => {
    if (animationData && animationDataWidth === null) {
      const { w, h } = animationData;
      setAnimationDataWidth(w);
      setAnimationDataHeight(h);
    }
  }, [animationData]);

  useEffect(() => {
    if (backgroundElement && themeAnimationElement) {
      const backgroundElementWidth = backgroundElement?.getBoundingClientRect()?.width;

      setBackgroundWidth(backgroundElementWidth);
    }
  }, [backgroundElement, themeAnimationElement]);

  useEffect(() => {
    if (contentElement && backgroundElement) {
      const contentHeight = contentElement.getBoundingClientRect().height;
      const backgroundParentHeight = backgroundElement?.parentElement?.getBoundingClientRect()
        ?.height as any;

      setBackgroundStretch(contentHeight < backgroundParentHeight);
    }
  }, [backgroundElement, contentElement]);

  const onDOMLoadedAnimation = () => {
    if (themeAnimationElement && backgroundWidth) {
      themeAnimationElement.querySelector('svg')?.setAttribute('width', `${backgroundWidth}`);
    }
  };

  return (
    <ThemeBackground
      selectedTheme={theme}
      ref={backgroundRefCallback}
      backgroundStretch={backgroundStretch}>
      {animationData && (
        <ThemeAnimationBackground
          ref={themeAnimationRefCallback}
          animationSize={theme?.animationSize}
          animationPosition={theme?.animationPosition}>
          <Lottie
            autoPlay={true}
            loop={true}
            animationData={animationData}
            rendererSettings={{
              preserveAspectRatio: `x${theme?.animationPreserveAspectRatioX}Y${theme?.animationPreserveAspectRatioY} ${theme?.animationPreserveAspectRatioScale}`,
            }}
          />
        </ThemeAnimationBackground>
      )}
      <Content ref={contentRefCallback}>{children}</Content>
    </ThemeBackground>
  );
};
