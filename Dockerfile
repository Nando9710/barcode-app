# Stage 1: Build
FROM bitnami/node:18 AS build

ARG barcode-app

RUN echo $barcode-app

ARG RAILWAY_DOCKERFILE_PATH

WORKDIR /usr/src/app

COPY package*.json ./

# RUN npm install -g pnpm

RUN npm install

COPY . .

RUN npm run build

# Stage 2
FROM nginx:1.25.0-alpine

COPY --from=build /usr/src/app/dist/barcode-app/browser /usr/share/nginx/html

COPY --from=build /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80