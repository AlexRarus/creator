# build env
FROM node:16.5.0-alpine as build

# Install git
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

COPY .git/ .git/

WORKDIR /app

# todo КОНТЕКСТ при запуске (через ./deploy/docker-compose.yml) установлен в корне git репозитория
COPY ./frontend/package*.json ./

RUN npm install

COPY ./frontend/ ./

RUN ./build_icons.sh
RUN npm run build

CMD cp -r build result_build
