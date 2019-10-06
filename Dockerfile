FROM node:12.10.0-alpine

COPY . /app
WORKDIR /app

EXPOSE 8080

RUN npm ci && npm run build

ENTRYPOINT [ "npm", "start" ]
