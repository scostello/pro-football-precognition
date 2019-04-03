FROM node:11.13.0-alpine

ENV APPS_DIR=/apps
ENV APP_NAME=pfa-api
ENV APP_PATH=${APPS_DIR}/${APP_NAME}

WORKDIR ${APP_PATH}

COPY package*.json ./

COPY .babelrc ./
COPY src/ src/

RUN yarn install &&\
    yarn run build

EXPOSE 3030 5858

CMD ["npm", "start"]