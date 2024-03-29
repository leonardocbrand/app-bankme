FROM node:18-alpine

WORKDIR /server

COPY package*.json ./

RUN npm ci

COPY . .

ARG DATABASE_URL

ENV DATABASE_URL=$DATABASE_URL

RUN npx prisma migrate dev

CMD [ "npm", "run", "start" ]