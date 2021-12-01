FROM node:latest

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install -q --no-color --no-progress

COPY . .

CMD ["npm", "run", "start:dev"]