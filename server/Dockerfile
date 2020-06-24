FROM node:10

WORKDIR /server

COPY ./package.json .
RUN npm install

COPY ./ .
EXPOSE 3000

# for dev
CMD ["yarn", "dev"]

# for prod
# CMD ["npm", "start"]