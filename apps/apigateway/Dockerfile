FROM node:lts-alpine3.19 As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm update

RUN npm install

COPY . .

RUN npm run build-apigateway

################################################## 

FROM node:lts-alpine3.19 As production

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm update

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node","dist/apps/apigateway/src/main"]