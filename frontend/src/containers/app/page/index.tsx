import React from 'react';
import { useParams } from 'react-router-dom';
import API from 'src/api';
import { useSsrComponentData } from 'src/hooks/useSsrComponentData';

import { PageContainer } from './container';
import { store } from './container/store';

interface IParams {
  username: string;
  pageSlug: string;
  [key: string]: string | undefined;
}

// отображение пользовательской страницы
const Page = (props: any) => {
  const params = useParams<IParams>();
  const ssrComponentData = useSsrComponentData();
  store.initSsrAction(ssrComponentData);

  return <PageContainer {...props} {...params} />;
};
// запрос данных страницы при SSR
Page.fetchData = async (params: any) => {
  try {
    // запрашиваем данные страницы
    const response = await API.endpoints.pages.getPageBySlug(params.username, params.pageSlug);
    return {
      ...response.data,
      status: 200,
    };
  } catch (e) {
    return {
      title: `wallink.ru`,
      description: `description wallink.ru`,
      status: e.response.status || 500,
    };
  }
};

export default Page;
