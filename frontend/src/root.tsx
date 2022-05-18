import React, { Suspense, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import Notification from 'src/components/notification';
import { ScrollGlobalStyle } from 'src/utils/scroll';
import { useAppTypeContext } from 'src/providers/app-type-provider';
import API from 'src/api';
import { useHackDndContext } from 'src/providers/hack-dnd-provider';
import { Route, Routes } from 'react-router-dom';
import { isBrowser } from 'src/utils/detectEnvironment';
import { HasAuthProvider } from 'src/providers/has-auth-provider';

import { useMapStoreToProps } from './selectors';
import { GlobalStyleApp } from './style';
import authRoutes from './router/routes/auth-routes';
import profileRoutes from './router/routes/profile-routes';
import appRoutes from './router/routes/app-routes';
import { ProtectedRoute } from './router/protected-route';

const SsrCompatibleSuspense = isBrowser ? Suspense : ({ children }: any) => children;
const Root = observer((props: any) => {
  const { initAuthAction, logoutAction, access } = useMapStoreToProps();
  const { appType } = useAppTypeContext();
  const { isDragging } = useHackDndContext();
  const [startVisualViewportHeight, setStartVisualViewportHeight] = useState<number>(0);

  useEffect(() => {
    // на мобилках есть странный баг, когда закрывается виртуальная клавиатура
    // иногда страница остается подвешеной на несколько пикселей выше нуля
    // из за этого любой первый клик по странице сначала "возвращает" ее в нормальное состояние
    // а потом только элементы начинают реагировать на клики (этим ХУКОМ проблема РЕШАЕТСЯ)

    setStartVisualViewportHeight(window.visualViewport?.height || 0);

    const syncPageTop = (e: any) => {
      const htmlHeight = document.documentElement.getBoundingClientRect().height;
      const scrollHeight = document.documentElement.scrollHeight;

      // todo данная проблема возникает только на страницах БЕЗ скрола
      if (
        htmlHeight === scrollHeight &&
        e.target.height >= startVisualViewportHeight &&
        e.target.pageTop > 0
      ) {
        window.scroll(0, 0);
      }
    };

    window.visualViewport.addEventListener('resize', syncPageTop);

    return () => {
      window.visualViewport.removeEventListener('resize', syncPageTop);
    };
  }, [startVisualViewportHeight]);

  useEffect(() => {
    // блокируем скролл window чтобы пользователь не смог проскроллить до черной полосы в сафари
    const lockWindowScroll = (event: any) => {
      const htmlRect = document?.documentElement?.getBoundingClientRect();
      if (htmlRect?.top != 0 && !isDragging) {
        window.scrollTo(0, 0);
      }
    };

    if (appType === 'app') {
      window.addEventListener('touchend', lockWindowScroll, { passive: false });
    }
    return () => window.removeEventListener('touchend', lockWindowScroll);
  }, [appType, isDragging]);

  useEffect(() => {
    const responseSuccess = (response: any) => {
      const status: any = response?.status;
      if (status === 401) {
        logoutAction();
      }

      try {
        return JSON.parse(response);
      } catch (err) {
        return response;
      }
    };
    const responseFail = (error: any) => {
      const status: any = error?.response?.status;
      if (status === 401) {
        logoutAction();
      }
      return Promise.reject(error);
    };

    API.init(responseSuccess, responseFail);
  }, []);

  useEffect(() => {
    if (access) {
      initAuthAction();
    }
  }, [access]);

  return (
    <HasAuthProvider access={access}>
      <GlobalStyleApp appType={appType} isDragging={isDragging} />
      <ScrollGlobalStyle />
      <Notification maxShowItems={5} />
      <SsrCompatibleSuspense fallback={''}>
        <Routes>
          <Route path='/auth'>
            {authRoutes.map(({ index, path, Component }: any) => (
              <Route
                key={path}
                index={index}
                path={path}
                element={
                  <ProtectedRoute allow={!access}>
                    <Component />
                  </ProtectedRoute>
                }
              />
            ))}
          </Route>
          <Route path='/profile'>
            {profileRoutes.map(({ index, path, Component }: any) => (
              <Route
                key={path}
                index={index}
                path={path}
                element={
                  <ProtectedRoute allow={Boolean(access)}>
                    <Component />
                  </ProtectedRoute>
                }
              />
            ))}
          </Route>
          <Route path='/'>
            {appRoutes.map(({ index, path, Component }: any) => (
              <Route key={path} index={index} path={path} element={<Component />} />
            ))}
          </Route>
        </Routes>
      </SsrCompatibleSuspense>
    </HasAuthProvider>
  );
});

export default Root;
