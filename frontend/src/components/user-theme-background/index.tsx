import React, { useEffect, useState } from 'react';
import { ITheme } from 'src/dal/themes/interfaces';
import Lottie from 'lottie-react';

import { ThemeBackground, ThemeAnimationBackground, Content } from './style';

interface IProps {
  theme?: ITheme | null;
  children?: any;
  minHeight?: string;
}

export const UserThemeBackground = (props: IProps) => {
  const { theme, children, minHeight: initialMinHeight } = props;
  const [initialized, setInitialized] = useState(false);
  const [backgroundStretch, setBackgroundStretch] = useState(false);
  const [backgroundElement, backgroundRefCallback] = useState<HTMLDivElement | null>(null);
  const [themeAnimationElement, themeAnimationRefCallback] = useState<HTMLDivElement | null>(null);
  const [contentElement, contentRefCallback] = useState<HTMLDivElement | null>(null);
  const [minHeight, setMinHeight] = useState<string | null>(null);

  const [animationData, setAnimationData] = useState<any>();
  const [animationDataWidth, setAnimationDataWidth] = useState<number | null>(null);
  const [animationDataHeight, setAnimationDataHeight] = useState<number | null>(null);

  useEffect(() => {
    if (theme?.animation) {
      const fetchAnimation = async () => {
        const json = await fetch(`/lottie/${theme.animation}`).then((res) => res.json());
        setAnimationData(json);
      };

      fetchAnimation();
    }

    return () => setAnimationData(null);
  }, [theme?.animation]);

  useEffect(() => {
    if (animationData && animationDataWidth === null) {
      const { w, h } = animationData;
      setAnimationDataWidth(w);
      setAnimationDataHeight(h);
      setInitialized(true); // этот флаг нужен только если ЕСТЬ анимация
    }
  }, [animationData]);

  useEffect(() => {
    if (backgroundElement && themeAnimationElement && initialized) {
      const backgroundElementRect = backgroundElement?.getBoundingClientRect();
      const themeAnimationElementRect = themeAnimationElement?.getBoundingClientRect();
      const backgroundElementHeight = backgroundElementRect?.height;
      const themeAnimationElementHeight = themeAnimationElementRect?.height;

      // выбираем максимальное значение - оно буде в качестве минимальной высоты блока
      if (initialMinHeight) {
        setMinHeight(initialMinHeight);
      } else {
        setMinHeight(
          `${Math.max(backgroundElementHeight as number, themeAnimationElementHeight as number)}px`
        );
      }
    }
  }, [backgroundElement, themeAnimationElement, initialized]);

  useEffect(() => {
    if (contentElement && backgroundElement) {
      const contentHeight = contentElement.getBoundingClientRect().height;
      const backgroundParentHeight = backgroundElement?.parentElement?.getBoundingClientRect()
        ?.height as any;

      setBackgroundStretch(contentHeight < backgroundParentHeight);
    }
  }, [backgroundElement, contentElement]);

  return (
    <ThemeBackground
      selectedTheme={theme}
      ref={backgroundRefCallback}
      backgroundStretch={backgroundStretch}
      minHeight={minHeight}>
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
      {children && <Content ref={contentRefCallback}>{children}</Content>}
    </ThemeBackground>
  );
};
