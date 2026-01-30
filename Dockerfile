# -------- Build Stage --------
FROM node:25-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# -------- Serve Stage --------
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

# React Router support
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
