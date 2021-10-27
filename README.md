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
docker-compose -f ./infra/docker-compose.yml up --build
```
Список контейнеров
```shell
docker ps
```
Запуск консоли
```shell
docker exec -it <CONTAINER ID> bash
```
Создание суперпользователя
```shell
python manage.py createsuperuser
```
> **Develop:** Проект запускается на адресе: [http://localhost/](http://localhost/)
> 
> **API Docs:** Документация на API находится на адресе: [http://localhost/api/docs/](http://localhost/api/docs/)

## Подготовка контейнера django к работе
Узнать <CONTAINER_ID>
```shell
docker ps
```
Копируем в контейнер файл с данными для БД
```shell
docker cp ./data/ingredients.json <CONTAINER_ID>:/code/ingredients.json
```
Подключиться к контейнеру
```shell
docker exec -it <CONTAINER_ID> bash
```
Выполнить миграции
```shell
python manage.py makemigrations users
python manage.py makemigrations api
python manage.py migrate users
python manage.py migrate api
```
Собрать статику
```shell
python manage.py collectstatic
```
Заполнение базы данными из файла *ingredients.json*
```shell
python manage.py shell
```
```python
import json
from api.models import Ingredient


f = open('ingredients.json')
data = json.load(f)

for ingredient_data in data:
    try:
        name = ingredient_data['name']
        measurement_unit = ingredient_data['measurement_unit']
        Ingredient.objects.create(name=name, measurement_unit=measurement_unit)
    except Exception:
        print('Ошибочка вышла', ingredient_data)
```
Остальные данные (например теги) можно добавить через админку
> **Внимание:** Проект запускается на адресе: [http://178.154.216.28/](http://178.154.216.28/)
>
> Документация API доступна на: [http://178.154.216.28/api/docs/](http://178.154.216.28/api/docs/)
> 
> Админка на: [http://178.154.216.28/admin/](http://178.154.216.28/admin/)

## Генерирование схемы API
```shell
python ./backend/manage.py generateschema > ./docs/openapi-schema.yml
cd ./docs
npx redoc-cli bundle ./openapi-schema.yml
```