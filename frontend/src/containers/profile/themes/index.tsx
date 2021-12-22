import React from 'react';
import { useParams } from 'react-router-dom';

import { ThemesContainer } from './container';

interface IParams {
  username: string;
  themeType: string;
}

// страница списка тем
const ThemesPage = (props: any) => {
  const params = useParams<IParams>();

  return <ThemesContainer {...props} {...params} />;
};

export default ThemesPage;
