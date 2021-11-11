# creator

## Project Status

[![GithubActionWorkflow](https://github.com/AlexRarus/creator/actions/workflows/main.yml/badge.svg)](https://github.com/AlexRarus/creator/actions)

## Сборка проекта FRONTEND для РАЗРАБОТКИ
### Переходим в дирректорию frontend
```shell
cd ./frontend
```
### Копируем и переименовываем файл с переменными окружения
```shell
cp .env.template .env
```
### Устанавливаем зависимости и запускаем проект
```shell
npm install
npm run start
```

## Настройка окружения для разработки бэка
Установка pre-commit
```shell
pip install pre-commit
```
В корне проекта выполнить активацию хуков
```shell
pre-commit install
```
Проверка, что хуки работают
```shell
pre-commit run --all-files
```

## Сборка проекта backend для разработки
### Запуск БД
> **Внимание:** Для запуска БД нужен docker-compose версии не ниже *1.29.1*
```shell
docker-compose -f ./backend/docker-compose.dev.yml up --build
```
### Запуск приложения
> **Внимание:** перед запуском приложения убедитесь что активировано виртуальное окружение и установленны все зависимости из *requirements.txt*.
```shell
./backend/manage.py runserver
```
Создание суперпользователя
```shell
python manage.py createsuperuser
```

## Сборка полного проекта для тестирования (front+back+postgres+nginx+redoc)
```shell
docker-compose -f ./deploy/docker-compose.yml up --build
```
> Документация API доступна на: [http://localhost/redoc/](http://localhost/redoc/)
> 
> Админка на: [http://localhost/admin/](http://localhost/admin/)

> **Внимание:** Проект запускается на адресе: [http://localhost/](http://localhost/)


## Отдельная сборка image фронта
```shell
docker build -f ./frontend/Dockerfile -t rarus/creator_frontend:latest .
docker push rarus/creator_frontend:latest
```

## Отдельная сборка image бэка
```shell
docker build -f ./backend/Dockerfile -t rarus/creator_backend:latest ./backend
docker push rarus/creator_backend:latest
```


## Подготовка удаленного сервера к деплою
> **Внимание:** Для запуска проекта необходим Docker и docker-compose версии не ниже *1.29.1*
> 
> [Установка docker на ubuntu18.04](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04)
> 
> [Установка docker-compose на ubuntu18.04](https://www.digitalocean.com/community/tutorials/how-to-install-docker-compose-on-ubuntu-18-04-ru)
### Копирование директории ./deploy на удаленный сервер
```shell
scp -r ./deploy user@178.154.216.28:/home/user/
```
### Подключиться к серверу и проверить наличие директории ./deploy
```shell
ssh user@example.com
```

> Документация API доступна на: [http://178.154.216.28/redoc/](http://178.154.216.28/redoc/)
> 
> Админка на: [http://178.154.216.28/admin/](http://178.154.216.28/admin/)
> 
> API доступно на: [http://178.154.216.28/api/](http://178.154.216.28/api/)

> **Внимание:** Проект запускается на адресе: [http://178.154.216.28/](http://178.154.216.28/)
