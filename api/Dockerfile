FROM node:10.2.1-alpine

ENV APPS_DIR=/apps
ENV APP_NAME=pfa-api
ENV APP_PATH=${APPS_DIR}/${APP_NAME}

WORKDIR ${APP_PATH}
RUN npm install -g nodemon yarn

COPY package*.json ./

RUN yarn install --quiet

COPY src ./src
COPY .babelrc .

EXPOSE 3030 5858

CMD ["yarn", "start"]