#Build stage
FROM node:lts-alpine AS build

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

#Production stage
FROM node:lts-alpine AS production

WORKDIR /app

COPY package*.json .

RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist

CMD ["node", "dist/server.js"]