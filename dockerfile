FROM node:20-alpine as base 

workdir /usr/src/app

copy package*.json .
RUN npm install --production

COPY . .

EXPOSE 9000

CMD [ "node" "server.js" ]
