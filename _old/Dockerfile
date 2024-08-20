# Build Stage
FROM node:16-alpine AS build

WORKDIR /tmp/app

RUN apk add --no-cache libc6-compat

COPY package*.json ./
RUN npm ci

ENV BUILDING_STAGE true
COPY .. .
RUN npm run build

# Image
FROM node:16-alpine

WORKDIR /opt/app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY ../README.md Dockerfile ./
COPY --from=build /tmp/app/public ./public
COPY --from=build --chown=nextjs:nodejs /tmp/app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /tmp/app/.next/static ./.next/static

USER nextjs

ENV PORT 3000
EXPOSE 3000

CMD ["node", "server.js"]
