######################################
# 1️⃣  Étape build – compile React SPA
######################################
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

#############################################
# 2️⃣  Étape runtime – sert l'app statique
#############################################
FROM nginx:alpine AS prod
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
