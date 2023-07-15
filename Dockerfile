FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY env-production.txt ./.env

EXPOSE 8080

CMD [ "npm", "run", "start:prod" ]