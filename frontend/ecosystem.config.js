module.exports = {
  apps : [{
    name: 'ssr',
    script: './build-ssr/ssr.js',
    watch: false,
    autorestart: true,
    out_file: './ssr-logs/output.log', // логи
    error_file: './ssr-logs/error.log', // ошибки
    log_file: './ssr-logs/log.log', // и логи и ошибки в одном файле
    log_date_format: 'YYYY-MM-DD HH:mm Z',
  }]
};
