// конфиг для запуска SSR
global.Promise = require('bluebird');

import config from './ssr/webpack/config';

// eslint-disable-next-line
console.log('NODE_ENV === %s', process.env.NODE_ENV);

export default config();
