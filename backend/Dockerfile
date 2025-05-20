# backend/Dockerfile  (image unique pour backend + seed)
FROM node:20-alpine
WORKDIR /app

# 1. dépendances
COPY package*.json ./
RUN npm ci          # installe prod + dev

# 2. tout le code (inutile de copier seed.js séparément)
COPY . .

ENV PORT=3001
EXPOSE 3001

# 3. image servant par défaut le backend
CMD ["npm","run","dev"]
