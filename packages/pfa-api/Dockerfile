FROM node:11.15.0-alpine

ENV APPS_DIR=/apps
ENV APP_NAME=pfa-api
ENV APP_PATH=${APPS_DIR}/${APP_NAME}

WORKDIR ${APP_PATH}

RUN apk --no-cache add \
  bash \
  g++ \
  ca-certificates \
  lz4-dev \
  musl-dev \
  cyrus-sasl-dev \
  openssl-dev \
  make \
  python &&\
  apk add --no-cache --virtual .build-deps \
  gcc \
  zlib-dev \
  libc-dev \
  bsd-compat-headers \
  py-setuptools \
  bash

COPY package*.json ./

COPY .babelrc ./
COPY src/ src/

RUN yarn install &&\
    yarn run build

EXPOSE 3030 5858

CMD ["yarn", "run", "watch"]