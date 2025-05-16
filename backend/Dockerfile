# backend/Dockerfile  (dev-friendly)

FROM node:20-alpine
WORKDIR /app

# installe **toutes** les dépendances (prod + dev)
COPY package*.json ./
RUN npm ci          # ❌ pas de --omit=dev

# copie le code
COPY . .

ENV PORT=3001
EXPOSE 3001

# lance le mode dev (nodemon doit exister)
CMD ["npm","run","dev"]
