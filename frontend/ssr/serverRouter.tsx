import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { StaticRouter } from 'react-router-dom';
import qs from 'qs';
import Root from 'src/root';
import { Provider } from 'react-redux';
import store from 'src/store';
import manifest from 'root/manifest.json';
import InnerRouter from 'src/innerRouter'; // todo custom router
import routes from 'src/routes';

import renderHTML from './template';

const router = express.Router();
const sheet = new ServerStyleSheet();
const context = {};
const { publicPath, assetsByChunk, assets } = manifest;
const { dispatch } = store;

async function render({ url, userAgent, headers }) {
  // baseUrl был нужен для тестирования с телефона
  const { title } = await InnerRouter.loadRoute(routes, url, dispatch, headers);
  // данные приложения должны запрашиваться после данных конкретной страницы, страница своими запросами может повлиять на данные юзера
  await App.fetchData(dispatch, { userAgent, headers });
  // todo запрашиваем данные
  //  заполняем стор

  const state = store.getState();
  const __INIT_STATE__ = JSON.stringify(state.toJS());
  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={url} context={context}>
        <StyleSheetManager sheet={sheet.instance}>
          <Root />
        </StyleSheetManager>
      </StaticRouter>
    </Provider>
  );

  const style = sheet.getStyleTags();

  return renderHTML(html, style, publicPath, assetsByChunk, assets, __INIT_STATE__, title);
}

router.get('*', async (req, res) => {
  const { headers, baseUrl: path } = req;
  const queryString = qs.stringify(req.query);
  const url = `${path[0] === '/' ? path : `/${path}`}${queryString ? `?${queryString}` : ''}`;

  const userAgent = headers['user-agent'] || '';
  const page = await render({ url, userAgent, headers });

  res.send(page);
});

export default router;
