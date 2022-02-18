### Установка ssl сертификата
> [Установка ssl сертификата на nginx](https://help.reg.ru/hc/ru/articles/4408046821009-%D0%9A%D0%B0%D0%BA-%D0%BD%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B8%D1%82%D1%8C-SSL-%D1%81%D0%B5%D1%80%D1%82%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%82-%D0%BD%D0%B0-Nginx)

### Копирование директории ./ssl на удаленный сервер
```shell
scp -r ./ssl wallink@84.201.154.103:/home/wallink/ssl
```

### Добавить в секрет на github
```shell
SSL_ENABLED=True
```
