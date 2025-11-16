FROM node:lts AS deps
WORKDIR /app
COPY package*.json .
RUN npm ci

FROM node:lts AS build
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules/ node_modules/
RUN npm run prisma:generate
RUN npm run build

FROM node:lts AS release
WORKDIR /app
COPY --from=build /app/dist/ dist/
COPY package*.json .
RUN npm ci --only=production
COPY prisma prisma/
RUN npm run prisma:generate

FROM node:lts
WORKDIR /app
COPY --chown=node:node --from=release /app/dist/ dist/
COPY --chown=node:node --from=release /app/node_modules/ node_modules/
COPY --chown=node:node --from=release /app/prisma prisma/
RUN apt-get update \
    && apt-get install -y --no-install-recommends tini openssl ca-certificates \
    && rm -rf /var/lib/apt/lists/*
USER node
ENTRYPOINT ["tini", "--"]
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]
