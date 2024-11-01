FROM node:20.18.0-alpine AS base

FROM base AS deps

WORKDIR /tmp/app

COPY package*.json ./
RUN npm ci

FROM base AS build

ENV NODE_ENV=production
WORKDIR /tmp/app

COPY --from=deps /tmp/app/node_modules ./node_modules
COPY . .

# Any NEXT_PUBLIC env variables must be added here for them to work.
ENV NEXT_PUBLIC_URL=NEXT_PUBLIC_URL
ENV NEXT_PUBLIC_DOWNLOADS_URL=NEXT_PUBLIC_DOWNLOADS_URL
ENV NEXT_PUBLIC_STRAPI_PROTO=NEXT_PUBLIC_STRAPI_PROTO
ENV NEXT_PUBLIC_STRAPI_HOST=NEXT_PUBLIC_STRAPI_HOST
ENV NEXT_PUBLIC_STRAPI_PORT=NEXT_PUBLIC_STRAPI_PORT

RUN npm run build

FROM base AS runner

RUN adduser -D starpep-web-frontend
USER starpep-web-frontend

WORKDIR /opt/app

COPY --from=build --chown=starpep-web-frontend /tmp/app/public ./public
COPY --from=build --chown=starpep-web-frontend /tmp/app/.next/standalone ./
COPY --from=build --chown=starpep-web-frontend /tmp/app/.next/static ./.next/static

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

COPY --chown=starpep-web-frontend entrypoint.sh ./
RUN chmod +x /opt/app/entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]
CMD ["node", "server.js"]
