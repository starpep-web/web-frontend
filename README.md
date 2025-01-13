# Web Frontend

This repository contains the code for the web frontend.

## Requirements

In order to develop for this repository you need:

* [Node.js v20.18.0](https://nodejs.org/en) (but any `v20` should work fine)
* [Docker](https://www.docker.com/products/docker-desktop/)
* Have [env-development](https://github.com/starpep-web/env-development) running locally.
* Have [api-service](https://github.com/starpep-web/api-service) running locally.
* Have [api-bio](https://github.com/starpep-web/api-bio) running locally.
* Have [web-cms](https://github.com/starpep-web/web-cms) running locally.

## Development

First, clone this repository:

```bash
git clone https://github.com/starpep-web/web-frontend
```

Install the dependencies:

```bash
npm install
```

Create an `.env` file with the following contents:

```text
API_URL=http://localhost:4000
BIO_API_URL=http://localhost:8000

NEXT_PUBLIC_URL=http://localhost:3000
NEXT_PUBLIC_DOWNLOADS_URL=http://localhost:10000
LOCAL_DOWNLOADS_URL=http://localhost:10000

NEXT_REVALIDATE_TIME=600
NEXT_INTERNAL_AUTH_SECRET=SOMETHING_HERE

STRAPI_API_TOKEN=YOUR_TOKEN_HERE
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

> Replace `YOUR_TOKEN_HERE` with a token generated on your Strapi instance created by following [web-cms](https://github.com/starpep-web/web-cms)'s README.

Run the `dev` script:

```bash
npm run dev
```

And done, the service should be reachable at `http://localhost:3000`.

If you make changes to the [web-cms](https://github.com/starpep-web/web-cms) or if you create/edit Strapi GraphQL queries, you should run the `npm run cms:codegen` command to update typing and schemas.

## Testing

Some testing commands are available to you:

### `npm run type-check`

This command will run the TypeScript type checker for any compile errors.

### `npm run lint`

This command will run the linter to check for any styling errors.

### `npm run lint:fix`

This command will run the linter and fix any fixable styling errors.

### `npm run test`

This command will run unit tests once.

### `npm run test:watch`

This command will run the unit test runner in watch-mode.

## Building

If you're developing this on your local machine, consider building the Docker image with the following command:

```bash
docker build -t local-starpep/web-frontend:latest .
```

You can create a new container to try it out with the following command:

```bash
docker run -it --rm -p 3000:3000 -e API_URL=http://localhost:4000 -e BIO_API_URL=http://localhost:8000 -e NEXT_PUBLIC_URL=http://localhost:3000 -e NEXT_PUBLIC_DOWNLOADS_URL=http://localhost:10000 -e LOCAL_DOWNLOADS_URL=http://localhost:10000 -e NEXT_REVALIDATE_TIME=600 -e STRAPI_API_TOKEN=YOUR_TOKEN_HERE -e NEXT_PUBLIC_STRAPI_URL=http://localhost:1337 local-starpep/web-frontend:latest
docker run -it --rm -p 3000:3000 local-starpep/web-frontend:latest
```

And done, the service should be reachable at `http://localhost:3000`.

## Production

Consider checking this [docker-compose.yml](https://github.com/starpep-web/env-production/blob/main/docker-compose.yml) for an example on how to run this image in production.
