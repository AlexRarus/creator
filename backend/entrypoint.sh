#!/bin/sh

if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $SQL_HOST $SQL_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi

# Collect static files
echo "Collect static files"
python manage.py collectstatic --noinput

# Create directory for docs
if [ -d "./static/api/docs" ]
then
  echo "./static/api/docs directory already exists" ;
else
  mkdir -p ./static/api/docs
  echo "./static/api/docs directory is created"
fi

# Generate docs OpenAPI schema
echo "Generate OpenAPI schema"
python ./manage.py generateschema > ./static/api/docs/openapi-schema.yml

# Make database migrations
echo "Make database migrations"
python manage.py makemigrations

# Apply database migrations
echo "Apply database migrations"
python manage.py migrate

# Create super user if not exists
python manage.py createsuperuser --noinput

# Start server
echo "Starting server"
exec "$@"
