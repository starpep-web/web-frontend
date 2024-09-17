[![Build Status](https://ci.moonstar-x.dev/job/github-webpeptide/job/web-frontend/job/master/badge/icon?subject=CI%20%28Jenkins%29%0A)](https://ci.moonstar-x.dev/job/github-webpeptide/job/web-frontend/job/master/)

# web-frontend

Web Frontend made with Next.js (TypeScript)

## Development

To start development, make sure you're using Node version `16.15.1` which is the [LTS version at the time of writing](https://nodejs.org/en/about/releases/).
You can use [nvm](https://github.com/nvm-sh/nvm) to allow for multiple node versions in your machine.

You will also need [Docker](https://www.docker.com/) to create a development environment in your machine to have access
to the required services for development.

### First Steps

First, clone this repo:

```text
git clone https://github.com/WebPeptide/web-frontend
```

Then, install the project's dependencies:

```text
npm install
```

### Working

Start a development environment by running inside the `dev` folder:

```text
docker-compose up
```

This will start a neo4j database on port 7687 with a web dashboard on port 7474 and the datamining api on port 8080.
You can update these services by running:

```text
docker-compose pull
```

To start the development server, run:

```text
npm run dev
```

This will start a development server on port 3000 accessible at http://localhost:3000

You can also run the linter to make sure you have no linting errors with:

```text
npm run lint
```

Or run the auto-fixer for linting issues:

```text
npm run lint:fix
```

Also, you can run the test suites with:

```text
npm test
```

Or, run the test runner in watch mode with:

```text
npm run test:watch
```

## Building

You can build this application to generate a Docker image.

To do so, run the following command:

```text
docker build -t webpep/web-frontend .
```

This will create a `webpep/web-frontend` Docker image in your local machine.
