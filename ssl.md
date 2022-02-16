### Установка ssl сертификата
> [Установка ssl сертификата на nginx](https://www.leaderssl.ru/articles/224-ssl-nginx-ustanavlivaem-ssl-sertifikat-na-server-nginx)

### Копирование директории ./ssl на удаленный сервер
```shell
scp -r ./ssl root@185.20.227.228:/etc/
```

### Добавить в секреты на github параметры
```shell
SSL_ENABLED=True
```
