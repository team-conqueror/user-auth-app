FROM node:16-alpine

WORKDIR /app
COPY package*.json ./
COPY . ./


RUN ls -l

RUN npm install

COPY entrypoint.sh entrypoint.sh

EXPOSE 5000

ENTRYPOINT ["sh", "entrypoint.sh"]
