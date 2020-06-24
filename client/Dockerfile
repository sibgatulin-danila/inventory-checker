FROM node:10

WORKDIR /client

COPY ./package*.json .
RUN npm install
RUN npm install -g http-server

COPY ./ .
RUN npm run build

EXPOSE 8080

CMD ["yarn", "start"]