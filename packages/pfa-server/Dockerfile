FROM node:10.5.0-alpine

ENV APPS_DIR=/apps
ENV APP_NAME=pfa-api
ENV APP_PATH=${APPS_DIR}/${APP_NAME}

WORKDIR ${APP_PATH}
RUN npm install -g nodemon@1.17.5 yarn@1.7.0

COPY package*.json ./

RUN yarn install --quiet

COPY src ./src
COPY .babelrc .

EXPOSE 3031 5858

CMD ["yarn", "start"]