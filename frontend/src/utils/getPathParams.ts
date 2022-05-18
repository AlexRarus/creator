import { match } from 'react-router';

export function getPathParams(url: string, matchPath: match | null) {
  if (!matchPath) {
    return null;
  }
  if (matchPath.params) {
    return matchPath.params;
  }
  // разбиваем урл на составные части
  const urlParts = url.split('/');
  // разбиваем path на составные части
  return matchPath.path
    .split('/')
    .reduce((params: Record<string, any>, targetPathPart: string, index: number) => {
      // если часть path начинается с : то это параметр который нужно запомнить
      if (targetPathPart.startsWith(':')) {
        // исключаем лишние символы из наименования параметра
        const paramKey = targetPathPart.replace(':', '').replace('?', '');
        params[paramKey] = urlParts[index];
      }
      return params;
    }, {});
}
