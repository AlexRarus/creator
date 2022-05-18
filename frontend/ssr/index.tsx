import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import fs from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { matchPath } from 'react-router-dom';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import Root from 'src/root';
import { AppCommonProvider } from 'src/providers';
import routes from 'src/router/routes/app-routes';
import { getPathParams } from 'src/utils/getPathParams';
import { StaticContextProvider } from 'src/providers/static-context-provider';

// создание express приложения
const app = express();

// обслуживание статических ресурсов
app.get(/\.(js|css|map|ico|png|webmanifest)$/, express.static(path.resolve(__dirname, '../build')));

// создание страницы стилей
const sheet = new ServerStyleSheet();
// подключение cookieParser
app.use(cookieParser('secret'));

// в ответ на любые другие запросы отправляем 'index.html'
app.get('*', async (req: any, res: any) => {
  // получаем совпадающий роут
  const matchRoute: any = routes.find((route) => matchPath(route as any, req.originalUrl as any));
  const params = getPathParams(req.originalUrl, matchRoute);

  // получаем данные совпавшего компонента
  let componentData = null;
  let SSR_INITIAL_STATE = null;

  if (typeof matchRoute?.Component?.fetchData === 'function') {
    componentData = await matchRoute.Component.fetchData(params);

    SSR_INITIAL_STATE = {
      componentData,
      params,
      url: req.originalUrl,
    };
  }

  // читаем файл `index.html`
  let indexHTML = fs.readFileSync(path.resolve(__dirname, '../build/index.html'), {
    encoding: 'utf8',
  });

  // получаем HTML строку путем преобразования компонента 'App'
  const appHTML = renderToString(
    <StaticRouter location={req.originalUrl}>
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
