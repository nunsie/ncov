<h1 align="center"><strong>nCoV</strong></h1>

<br />

<div align="center"><img src="https://imgur.com/1MfnLVl.png" /></div>

<div align="center"><strong>🚀 COVID-19 meets GraphQL</strong></div>
<div align="center">A GraphQL Server on top of the coronavirus data provided by <a href="https://www.worldometers.info/coronavirus/">worldometers.info</a></div>

## Playground 👉 [api.ncov.co.za](https://api.ncov.co.za)

## Features

- **Statistics:** View up to date global statistics on COVID-19 cases.
- **Countries:** View up to date statistics on COVID-19 cases for all countries.
- **Country**: View up to date statistics on COVID-19 cases by country code.

## Requirements

You need to have the [Serverless](https://github.com/serverless/serverless/) installed to run the application locally or deploy it to your own AWS account:

```sh
npm install -g serverless
```

## Getting started

```sh
# 1. Install project dependencies with yarn
yarn

# 3. Start server (runs on http://localhost:3000) and open GraphQL Playground
yarn start
```

![](https://imgur.com/hElq68i.png)

## Documentation

### Commands

- `yarn start` starts GraphQL server on `http://localhost:3000` _and_ opens GraphQL Playground

- `yarn deploy` deploys application to AWS Lambda via serverless

## TODO

- [ ] Extract overall active cases data.
- [ ] Extract overll closed cases data.
- [ ] Extract last updated time.
