FROM node

WORKDIR /usr/src/app

COPY package.json .

COPY tsconfig.json .

COPY src/ ./src

RUN npm install

COPY .env .

RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]