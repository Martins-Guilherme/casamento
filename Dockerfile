FROM node:20 AS builder

WORKDIR /usr/app

COPY package*.json ./

RUN npm install --legacy-peer-deps

RUN npx prisma generate --schema=./prisma/schema.prisma

COPY . .

FROM node:20-alpine

WORKDIR /usr/app

COPY --from=builder /usr/app ./

EXPOSE 5000

CMD ["npm", "start"]