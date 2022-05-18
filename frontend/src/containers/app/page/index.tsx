import React from 'react';
import { useParams } from 'react-router-dom';
import API from 'src/api';
import { useSsrComponentData } from 'src/hooks/useSsrComponentData';

import { PageContainer } from './container';
import { store } from './container/store';

interface IParams {
  username: string;
  pageSlug: string;
  staticContext?: any; // контекст из StaticRouter для SSR
}

// отображение пользовательской страницы
const Page = (props: any) => {
  const params = useParams<IParams>();
  const ssrComponentData = useSsrComponentData(props.staticContext);
  store.initSsrAction(ssrComponentData);

  return <PageContainer {...props} {...params} />;
};
// запрос данных страницы при SSR
Page.fetchData = async (params: any) => {
  try {
    // запрашиваем данные страницы
    const response = await API.endpoints.pages.getPageBySlug(params.username, params.pageSlug);
    return response.data;
  } catch (e) {
    return {
      title: `wallink.ru`,
      description: `description wallink.ru`,
    };
  }
};

export default Page;
