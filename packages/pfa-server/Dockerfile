FROM node:10.9.0-alpine

ENV APPS_DIR=/apps
ENV APP_NAME=pfa-server
ENV APP_PATH=${APPS_DIR}/${APP_NAME}

WORKDIR ${APP_PATH}
RUN npm install -g nodemon@1.18.3 yarn@1.9.4

COPY package*.json ./

RUN yarn install --quiet

COPY src ./src
COPY lib ./lib
COPY .babelrc .

EXPOSE 3030 5858

CMD ["yarn", "start"]