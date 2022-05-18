import React, { useEffect, useMemo, useState } from 'react';
import ButtonGroup, { IButton } from 'src/components/buttons-group';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IThemeType } from 'src/dal/themes/interfaces';

import {
  ThemesHeaderWrapper,
  ThemesHeaderScrollable,
  ThemesHeaderScrollableValue,
  ThemesHeaderStatic,
  ThemesHeaderStaticLeft,
  ThemesHeaderStaticRight,
} from './styles';

interface IProps {
  username: string;
  themeType: string;
  themesTypes: IThemeType[];
}

export const ThemesHeader = (props: IProps) => {
  const { username, themeType, themesTypes } = props;
  const [headerElement, headerRefCallback] = useState<HTMLDivElement | null>(null);
  const [headerWidth, setHeaderWidth] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [hasLeftScroll, setHasLeftScroll] = useState(false);
  const [hasRightScroll, setHasRightScroll] = useState(false);
  const navigate = useNavigate();
  const { i18n, t } = useTranslation('themes');

  const themesButtons: IButton[] = useMemo(
    () =>
      themesTypes.map((themeType: IThemeType) => ({
        label: t(`themeType.${themeType.slug || 'default'}`),
        value: themeType.slug,
      })),
    [themesTypes, i18n.language]
  );

  const changeThemeType = (value: string) => {
    navigate(`/profile/${username}/themes/${value}`);
  };

  useEffect(() => {
    if (headerElement) {
      const headerWidth = headerElement.getBoundingClientRect().width;
      const headerHeight = headerElement.getBoundingClientRect().height;
      setHeaderWidth(headerWidth);
      setHeaderHeight(headerHeight);

      setTimeout(onScroll, 0);
    }
  }, [headerElement]);

  const onScroll = () => {
    if (headerElement) {
      const scrollWidth = headerElement.scrollWidth;
      const scrollLeft = headerElement.scrollLeft;
      setHasLeftScroll(Boolean(scrollLeft));
      setHasRightScroll(scrollWidth > headerWidth + scrollLeft);
    }
  };

  return (
    <ThemesHeaderWrapper>
      <ThemesHeaderScrollable onScroll={onScroll} ref={headerRefCallback}>
        <ThemesHeaderScrollableValue>
          <ButtonGroup buttons={themesButtons} value={themeType} onChange={changeThemeType} />
        </ThemesHeaderScrollableValue>
      </ThemesHeaderScrollable>
      <ThemesHeaderStatic>
        <ThemesHeaderStaticLeft hasLeftScroll={hasLeftScroll} headerHeight={headerHeight} />
        <ThemesHeaderStaticRight hasRightScroll={hasRightScroll} headerHeight={headerHeight} />
      </ThemesHeaderStatic>
    </ThemesHeaderWrapper>
  );
};
