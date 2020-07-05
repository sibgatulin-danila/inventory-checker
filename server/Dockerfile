FROM node:10

WORKDIR /usr/src/server

COPY ./package.json ./
RUN npm install

COPY . ./
EXPOSE 3000

# for dev
CMD ["yarn", "start:prod"]

# for prod
# CMD ["npm", "run", "start"]