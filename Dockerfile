FROM node:lts-alpine

RUN npm install -g npm@8.12.2

WORKDIR /usr/app

COPY package*.json ./

RUN npm install --legacy-peer-deps

RUN npx prisma generate

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
# CMD ["npm", "run", "dev"] para poder inicializar localmente




