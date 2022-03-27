### При создании выбрать установку панели управления ISPmanager (для настройки почтового сервера)

### Создание id_rsa на СВОЕМ компьютере
```shell
ssh-keygen
```

### Добвление is_rsa.pub на созданный сервер для подключения
```shell
ssh-copy-id root@185.20.227.228
```
или
```shell
cat ~/.ssh/id_rsa.pub | ssh root@185.20.227.228 'cat >> ~/.ssh/authorized_keys'
```

## Копирование приватного ключа ssh в секреты на github (PRIVATE_CLIENT_SSH_KEY)
```shell
cat ~/.ssh/id_rsa
```

### установка docker на ubuntu
> **Внимание:** Для запуска проекта необходим Docker и docker-compose версии не ниже *1.29.1*
> 
> [Установка docker на ubuntu20.04](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04)
> 
> [Установка docker-compose на ubuntu18.04](https://www.digitalocean.com/community/tutorials/how-to-install-docker-compose-on-ubuntu-18-04-ru)

### Обновление секретов на github
1. PRIVATE_CLIENT_SSH_KEY
2. HOST
3. USER
4. ALLOWED_HOSTS='["localhost", "127.0.0.1", "84.201.154.103", "wallink", "wallink.ru"]'

### Копирование директории ./deploy на удаленный сервер
```shell
scp -r ./deploy wallink@84.201.154.103:/home/wallink/
```

### Подключиться к серверу и проверить наличие директории ./deploy
```shell
ssh wallink@84.201.154.103
```

### autorun

```shell
chmod +x /home/wallink/deploy/autorun.sh
```

добавляем в конец bashrc:

```shell
vim ~/.bashrc
```

```shell
chmod +x /home/wallink/deploy/autorun.sh systemctl start creator.service
```

Создаем файл нашей службы:

```shell
sudo touch /etc/systemd/system/creator.service
sudo chmod 664 /etc/systemd/system/creator.service
sudo vim /etc/systemd/system/creator.service
```

Содержимое файла:

```shell
[Unit]
Description=Template Settings Service
After=network.target

[Service]
Type=oneshot
User=root
ExecStart=/home/wallink/deploy/autorun.sh

[Install]
WantedBy=multi-user.target
```

Проверяем и перезапускаем:

```shell
sudo systemctl daemon-reload
```

разрешим этот "сервис" для автозапуска:
```shell
sudo systemctl enable creator.service
```

```shell
sudo systemctl status creator.service
```
