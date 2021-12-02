const {
  override,
  disableEsLint,
  addBabelPlugin,
  addBundleVisualizer,
  addWebpackAlias,
  addWebpackPlugin,
  overrideDevServer,
} = require('customize-cra');
const path = require('path');
const GitRevisionPlugin = require('git-revision-webpack-plugin')
const webpack = require('webpack');
const packagejson = require('./package.json');

const gitRevisionPlugin = new GitRevisionPlugin({
  versionCommand: "log -n 1 --pretty='format:%cd' --date=format:'%d.%m.%Y'", // commit date
});

const LOCAL_API_URL = 'http://127.0.0.1:8000';
const SERVICE_API_URL = process.env.API_URL || LOCAL_API_URL;
const LOCAL_MEDIA_URL = process.env.LOCAL_MEDIA_URL;

const devServerConfig = () => config => {
  return {
    ...config,
    proxy: {
      '/api': {
        target: SERVICE_API_URL,
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '^/api': '/api',
        },
        secure: false,
        headers: {
          Connection: 'keep-alive'
        }
      },
      '/static': {
        target: SERVICE_API_URL,
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '^/static': '/static',
        },
        secure: false,
      },
      '/media': {
        target: SERVICE_API_URL === LOCAL_API_URL ? LOCAL_MEDIA_URL : SERVICE_API_URL,
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '^/media': '/media',
        },
        secure: false,
      },
    },
  }
}

module.exports = {
  webpack: override(
    disableEsLint(),
    addBabelPlugin(['styled-components', { displayName: true }]),
    (config) => (process.env.BUNDLE_VISUALIZE == 1 ? addBundleVisualizer()(config) : config),
    addWebpackAlias({
      src: path.resolve(__dirname, 'src'),
      // при обновлении на styled-components ^5.0.0 поднимается несколько instance-ов приложений и предложено решение
      // по ссылке https://styled-components.com/docs/faqs
      // cмотреть заголовок "Why am I getting a warning about several instances of module on the page?"
      'styled-components': path.resolve('./node_modules/styled-components'),
    }),
    addWebpackPlugin(
      new webpack.DefinePlugin({
        'process.env.COMMITDATE': JSON.stringify(gitRevisionPlugin.version()),
        'process.env.COMMITHASH': JSON.stringify(gitRevisionPlugin.commithash()),
        'process.env.BRANCH': JSON.stringify(gitRevisionPlugin.branch()),
        'process.env.VERSION': JSON.stringify(packagejson.version),
        'API_URL': JSON.stringify(process.env.API_URL),
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      })
    )
  ),

  // proxy для интеграции с сервисами
  devServer: overrideDevServer(
    devServerConfig()
  ),
};
