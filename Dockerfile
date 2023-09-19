FROM node:20.6.0

WORKDIR /gpt-app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8005 3005

CMD [ "npm", "start"]