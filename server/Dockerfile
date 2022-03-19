FROM node:latest

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN curl -sL https://unpkg.com/@pnpm/self-installer | node

RUN pnpm install -q --no-color

COPY . .

CMD ["npm", "run", "start:dev"]