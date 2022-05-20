import React from 'react';
import express from 'express';
import cookieParser from 'cookie-parser';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import fs from 'fs';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { matchPath } from 'react-router-dom';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import Root from 'src/root';
import { AppCommonProvider } from 'src/providers';
import { StaticContextProvider } from 'src/providers/static-context-provider';
import routes, { pageNotFoundPath } from 'src/router/routes/app-routes';
import { getPathParams } from 'src/utils/getPathParams';

// создание express приложения
const app = express();

// обслуживание статических ресурсов
const staticPath = path.resolve(__dirname, '../build');
app.get(/\.(js|css|map|ico|png|webmanifest)$/, express.static(staticPath));

if (process.env.NODE_ENV === 'development') {
  // создаем прокси для /api
  const apiProxy = createProxyMiddleware('/api', {
    target: 'http://127.0.0.1:8000',
    changeOrigin: true,
    ws: false,
    pathRewrite: {
      '^/api': '/api',
    },
    secure: false,
    headers: {
      Connection: 'keep-alive',
    },
  });
  app.use(apiProxy);
}

// создание страницы стилей
const sheet = new ServerStyleSheet();
// подключение cookieParser
app.use(cookieParser('secret'));

// в ответ на любые другие запросы отправляем 'index.html'
app.get('*', async (req: any, res: any) => {
  // получаем совпадающий роут
  let url = req.originalUrl;
  const matchRoute: any = routes.find((route) => matchPath(route as any, req.originalUrl as any));
  const params = getPathParams(req.originalUrl, matchRoute);

  // получаем данные совпавшего компонента
  let SSR_INITIAL_STATE = null;

  if (typeof matchRoute?.Component?.fetchData === 'function') {
    const { status, ...componentData } = await matchRoute.Component.fetchData(params);

    if (status === 404) {
      // чтобы отрендерить 404 ошибку, нужно изменить урл для роутера на неизвестный ему
      // либо установить урл на котором 100% рендерится 404 страница (в роутах она прописана отдельно)
      url = pageNotFoundPath(url);
    }

    SSR_INITIAL_STATE = {
      componentData,
      params,
      url,
    };
  }

  // читаем файл `index.html`
  let indexHTML = fs.readFileSync(path.resolve(__dirname, '../build/index.html'), {
    encoding: 'utf8',
  });

  // получаем HTML строку путем преобразования компонента 'App'
  const appHTML = renderToString(
    <StaticRouter location={url}>
      <StaticContextProvider context={SSR_INITIAL_STATE}>
        <AppCommonProvider>
          <StyleSheetManager sheet={sheet.instance}>
            <Root />
          </StyleSheetManager>
        </AppCommonProvider>
      </StaticContextProvider>
    </StaticRouter>
  );
  // получаем стили
  const style = sheet.getStyleTags();

  // заполняем элемент '#root' содержимым из 'appHTML'
  indexHTML = indexHTML.replace('<div id="root"></div>', `<div id="root">${appHTML}</div>`);
  // добавляем в конец head содержимое из 'style'
  indexHTML = indexHTML.replace('<style id="ssr_style_here"></style>', `${style}`);

  // задаём значение для глобальной переменной 'initial_state'
  indexHTML = indexHTML.replace(
    '<script>var SSR_INITIAL_STATE=null</script>',
    `<script>var SSR_INITIAL_STATE=${JSON.stringify(SSR_INITIAL_STATE)};</script>`
  );

  // задаём заголовок и статус
  res.contentType('text/html');
  res.status(200);

  return res.send(indexHTML);
});

const PORT = process.env.SSR_PORT;

app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`Server listening on: ${PORT}`);
});
