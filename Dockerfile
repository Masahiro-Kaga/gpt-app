FROM node:20.6.0

WORKDIR /gpt-app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000 3000

CMD [ "npm", "start"]