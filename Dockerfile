FROM node:12

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY .env /usr/src/app/

COPY ./api ./api

EXPOSE 8080


CMD ["node", "./api/app.js"]