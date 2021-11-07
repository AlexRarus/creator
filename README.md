# creator

## Project Status

[![GithubActionWorkflow](https://github.com/AlexRarus/foodgram-project-react/actions/workflows/main.yml/badge.svg)](https://github.com/AlexRarus/foodgram-project-react/actions)

## Настройка окружения для разработки
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

## Сборка полного проекта для тестирования (front+back+postgres+nginx)
```shell
docker-compose -f ./test/docker-compose.yml up --build
```
> Документация API доступна на: [http://localhost/api/docs/openapi-schema.yml](http://localhost/api/docs/openapi-schema.yml)
> 
> Админка на: [http://localhost/admin/](http://localhost/admin/)

> **Внимание:** Проект запускается на адресе: [http://178.154.216.28/](http://178.154.216.28/)
