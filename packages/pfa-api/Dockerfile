FROM quay.io/sean.costello/nodejs-rdkafka:11.15.0-0.11.6@sha256:574123e82c1b59bb773ea0260ce74dadf03b91ac3d2b4591a7cbdb7716cfb5b2

ENV APPS_DIR=/apps
ENV APP_NAME=pfa-api
ENV APP_PATH=${APPS_DIR}/${APP_NAME}
ENV BUILD_LIBRDKAFKA=0

WORKDIR ${APP_PATH}

COPY package*.json ./

COPY .babelrc ./
COPY src/ src/

RUN \
  yarn install &&\
  yarn run build &&\
  apk del build-deps

EXPOSE 3030 5858

CMD ["yarn", "run", "watch"]