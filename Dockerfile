# Stage 1: Build the application
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN yarn install --force
COPY . .
RUN yarn build

# Stage 2: Serve the application from Nginx
FROM nginx
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]