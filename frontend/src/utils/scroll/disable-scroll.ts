import { isBrowser } from 'src/utils/detectEnvironment';

/**
 * Такой способ блокировки скрола нужен для того чтобы
 * под windows всегда оставался scrollbar и как результат не прыгал контент с position: fixed
 *
 * для работы должен быть реализован css класс
    body.noscrollwithscrollbar {
      position: fixed;
      overflow-y: scroll;
      width: 100%;
    }
    body.noscroll {
      position: fixed;
      overflow-y: hidden;
      width: 100%;
    }
 */
export function disableScroll() {
  // todo ssr костыль
  if (isBrowser) {
    const body = document.body;
    const pageHeight = body.offsetHeight;
    const windowHeight = window.innerHeight;
    const hasScrollPanel = windowHeight / pageHeight !== 1;
    const scrollValue = window.pageYOffset;

    if (hasScrollPanel) {
      body.classList.add('noscrollwithscrollbar');
      body.setAttribute('style', `top: -${scrollValue}px`);
    } else {
      body.classList.add('noscroll');
    }
  }
}

export function enableScroll() {
  // todo ssr костыль
  if (isBrowser) {
    const body = document.body;
    if (Array.prototype.includes.call(body.classList, 'noscrollwithscrollbar')) {
      const scrollValue = Math.abs(parseInt(body.style.top, 10));
      body.classList.remove('noscrollwithscrollbar');
      body.removeAttribute('style');
      window.scrollTo(0, scrollValue);
    } else {
      body.classList.remove('noscroll');
    }
  }
}
